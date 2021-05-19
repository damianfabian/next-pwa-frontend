import React from 'react';
import {
	Notification as INotification,
	NotificationId,
} from '../../stores/notifications';
import Alert from '@material-ui/lab/Alert';
import styled, { css } from 'styled-components';

import { ANIMATION_DURATION } from '../../shared/notificationList';

export type NotificationProps = {
	notificationId: NotificationId;
	notification: INotification;
	generateHandle: () => [Boolean, () => void];
};

export default function Notification({
	notificationId,
	notification: { message, type = 'info' },
	generateHandle = () => [false, () => {}]
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

const WrapperAlert = styled(({ isClosing, ...rest }) => <Alert {...rest} />)<{
	isClosing: boolean;
}>`
	${(props) =>
		props.isClosing &&
		css`
			animation: fadeOut ${ANIMATION_DURATION / 1000}s;
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
