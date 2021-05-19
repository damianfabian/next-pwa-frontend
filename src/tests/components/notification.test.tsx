import { fireEvent, render, screen } from '@testing-library/react';
import Component, { NotificationProps } from 'components/notification';

let basicProps: NotificationProps = {
	notificationId: 123456,
	notification: {
		message: 'test component',
		isExpirable: false,
	},
	generateHandle: () => [false, jest.fn()],
};

describe('Notification Component', () => {
	it('renders without crashing', () => {
		render(<Component {...basicProps} />);
	});

	it('renders a notification', () => {
		render(<Component {...basicProps} />);

		expect(screen.getByTestId('alert-123456')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('renders a notification with close event working', () => {
		const [isClosing, onClose] = basicProps.generateHandle();
		const mockGenerate: typeof basicProps.generateHandle = () => [
			isClosing,
			onClose,
		];
		const options = { ...basicProps, generateHandle: mockGenerate };

		render(<Component {...options} />);

		expect(screen.getByTestId('alert-123456')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toBeInTheDocument();
		fireEvent.click(screen.getByTitle(/Close/i));
		expect(onClose).toHaveBeenCalled();
	});

	it('renders a notification with type error', () => {
		const options = Object.assign({}, basicProps);
		options.notification.type = 'error';

		render(<Component {...options} />);

		expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
	});
});
