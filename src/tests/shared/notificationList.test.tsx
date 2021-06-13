import React from 'react';
import Notification, { NotificationProps } from 'components/notification';
import { testRender, mockStore } from 'tests/utils/storeWrapper';
import { add } from 'features/notifications/notificationSlice';
import {
	fireEvent,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/dom';
import { StoreType } from 'store';
import Component from 'features/notifications/NotificationList.component';

let mockSpyHideNotification : Record<string, () => void> = {};

jest.mock('components/notification', () =>
	jest.fn((props) => {
		const [isClosing, onClose] = props.generateHandle();
		mockSpyHideNotification[props.notification.message] = onClose;
		return (
			<div role='alert' data-testid={`alert-${props.notificationId}`}>
				{props.notification.message}
				<button title='Close' onClick={onClose}>
					Close
				</button>
			</div>
		);
	})
);

describe('Notifications Shared Component', () => {
	let store: StoreType;
	let spyDispatch: jest.SpyInstance;

	beforeEach(() => {
		store = mockStore();
		jest.clearAllMocks();
		jest.resetModules();
		spyDispatch = jest.spyOn(store, 'dispatch');
	});

	it('renders without crashing', () => {
		testRender(<Component />, { store });
	});

	it('renders a notification', () => {
		const { getByTestId } = testRender(<Component />, { store });

		const action = add({
			message: 'Test1',
			isExpirable: false,
		});
		store.dispatch(action);

		expect(spyDispatch).toHaveBeenCalledWith(action);
		expect(getByTestId('alert-', { exact: false })).toBeInTheDocument();
	});

	it('renders a notification with close event', async (done) => {
		const { getByTitle, queryByText } = testRender(<Component />, {
			store,
		});

		const action = add({
			message: 'Test2',
			isExpirable: false,
		});
		store.dispatch(action);

		expect(spyDispatch).toHaveBeenCalledWith(action);
		expect(queryByText('Test2')).toBeInTheDocument();

		fireEvent.click(getByTitle(/Close/i));

		await waitForElementToBeRemoved(() => getByTitle(/Close/i));
		expect(queryByText('Test2')).not.toBeInTheDocument();
		done();
	});

	it('renders a notification with auto close default duration', async () => {
		jest.setTimeout(8000);


		const { queryByText } = testRender(<Component />, {
			store,
		});

		const action = add({
			message: 'Test3',
			isExpirable: true,
		});
		store.dispatch(action);

		expect(spyDispatch).toHaveBeenCalledWith(action);

		expect(queryByText('Test3')).toBeInTheDocument();
		await waitForElementToBeRemoved(() => queryByText('Test3'), {
			timeout: 6000,
		});
		expect(queryByText('Test3')).not.toBeInTheDocument();
	});

	it('renders a notification with auto close custom duration', async () => {

		const { queryByText } = testRender(<Component />, {
			store,
		});

		const action = add({
			message: 'Test4',
			isExpirable: true,
			type: 'warning',
			duration: 1000,
		});
		store.dispatch(action);

		expect(spyDispatch).toHaveBeenCalledWith(action);

		expect(queryByText('Test4')).toBeInTheDocument();
		await waitForElementToBeRemoved(() => queryByText('Test4'), {
			timeout: 2000,
		});
		expect(queryByText('Test4')).not.toBeInTheDocument();
	});

	it('renders a notification without changing hideNotification on render', async () => {

		const { getByText } = testRender(<Component />, {
			store,
		});

		const action = add({
			message: 'Test4',
			isExpirable: true,
			type: 'warning',
			duration: 1000,
		});
		store.dispatch(action);

		await waitFor(() => getByText('Test4'));

		const temp1 = mockSpyHideNotification['Test4'];

		const action2 = add({
			message: 'Test5',
			isExpirable: true,
			type: 'warning',
			duration: 1000,
		});
		store.dispatch(action2);

		const temp2 = mockSpyHideNotification['Test4'];
		await waitFor(() => getByText('Test5'));

		expect(temp1 === temp2).toBeTruthy();
	});
});
