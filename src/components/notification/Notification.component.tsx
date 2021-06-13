import React from 'react';
import Alert from '@material-ui/lab/Alert';
import styled, { css } from 'styled-components';

export type NotificationId = number;
export interface INotification {
    message: string,
    type?: 'error' | 'info' | 'warning' | 'success',
    duration?: number,
    isExpirable: boolean
}

export type NotificationProps = {
	notificationId: NotificationId;
	notification: INotification;
	animationTime: number;
	generateHandle: () => [Boolean, () => void];
};

export default function Notification({
	notificationId,
	notification: { message, type = 'info' },
	generateHandle = () => [false, () => {}],
	animationTime = 500
}: NotificationProps): JSX.Element {

	const [isClosing, onClose] = generateHandle();
	return (
		<WrapperAlert
			severity={type}
			onClose={onClose}
			isClosing={isClosing}
			data-testid={`alert-${notificationId}`}
		>
			{message}
		</WrapperAlert>
	);
}

const WrapperAlert = styled(({ isClosing, animationTime, ...rest }) => <Alert {...rest} />)<{
	isClosing: boolean;
	animationTime: number;
}>`
	${(props) =>
		props.isClosing &&
		css`
			animation: fadeOut ${ props.animationTime / 1000}s;
		`}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;
