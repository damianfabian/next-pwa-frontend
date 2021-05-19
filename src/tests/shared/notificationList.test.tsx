import React from 'react';
import Notification from '../../components/notification';
import { testRender, mockStore } from 'tests/utils/storeWrapper';
import { addNotification } from 'stores/notifications';
import {
	fireEvent,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/dom';
import { StoreType } from 'stores';
import Component from 'shared/notificationList';

let spyHideNotification = {};

jest.mock('components/notification', () =>
	jest.fn((props) => {
		const [isClosing, onClose] = props.generateHandle();
		spyHideNotification[props.notification.message] = onClose;
		return (
			<div
				role='alert'
				data-testid={`alert-${props.notificationId}`}
			>
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

	beforeAll(() => {
		store = mockStore();
	});
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});

	it('renders without crashing', () => {
		const store = mockStore();
		testRender(<Component />, { store });
	});

	it('renders a notification', () => {
		const { getByTestId } = testRender(<Component />, { store });

		const action = addNotification({
			message: 'Test1',
			isExpirable: false,
		});
		store.dispatch(action);

		expect(store.dispatch).toHaveBeenCalledWith(action);
		expect(getByTestId('alert-', { exact: false })).toBeInTheDocument();
	});

	it('renders a notification with close event', async (done) => {
		const store = mockStore();
		const { getByTitle, queryByText } = testRender(<Component />, {
			store,
		});

		const action = addNotification({
			message: 'Test2',
			isExpirable: false,
		});
		store.dispatch(action);

		expect(store.dispatch).toHaveBeenCalledWith(action);
		expect(queryByText('Test2')).toBeInTheDocument();

		fireEvent.click(getByTitle(/Close/i));

		await waitForElementToBeRemoved(() => getByTitle(/Close/i));
		expect(queryByText('Test2')).not.toBeInTheDocument();
		done();
	});

	it('renders a notification with auto close default duration', async () => {
		jest.setTimeout(8000);

		const store = mockStore();

		const { queryByText } = testRender(<Component />, {
			store,
		});

		const action = addNotification({
			message: 'Test3',
			isExpirable: true,
		});
		store.dispatch(action);

		expect(store.dispatch).toHaveBeenCalledWith(action);

		expect(queryByText('Test3')).toBeInTheDocument();
		await waitForElementToBeRemoved(() => queryByText('Test3'), {
			timeout: 6000,
		});
		expect(queryByText('Test3')).not.toBeInTheDocument();
	});

	it('renders a notification with auto close custom duration', async () => {
		const store = mockStore();

		const { queryByText } = testRender(<Component />, {
			store,
		});

		const action = addNotification({
			message: 'Test4',
			isExpirable: true,
			type: 'warning',
			duration: 1000,
		});
		store.dispatch(action);

		expect(store.dispatch).toHaveBeenCalledWith(action);

		expect(queryByText('Test4')).toBeInTheDocument();
		await waitForElementToBeRemoved(() => queryByText('Test4'), {
			timeout: 2000,
		});
		expect(queryByText('Test4')).not.toBeInTheDocument();
	});

	it('renders a notification without changing hideNotification on render', async () => {
		const store = mockStore();

		const { getByText } = testRender(<Component />, {
			store,
		});

		const action = addNotification({
			message: 'Test4',
			isExpirable: true,
			type: 'warning',
			duration: 1000,
		});
		store.dispatch(action);

		await waitFor(() => getByText('Test4'));

		const temp1 = spyHideNotification['Test4'];

		const action2 = addNotification({
			message: 'Test5',
			isExpirable: true,
			type: 'warning',
			duration: 1000,
		});
		store.dispatch(action2);

		const temp2 = spyHideNotification['Test4'];
		await waitFor(() => getByText('Test5'));

		expect(temp1 === temp2).toBeTruthy();
	});
});
