import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import styled from 'styled-components';
import Notification from 'components/notification';
import { hideNotification, NotificationId } from 'stores/notifications';
import { useCallback, useEffect, useState } from 'react';

export const ANIMATION_DURATION = 500;
export const NOTIFICATION_TTL = 5000;

const useHideNotification = (
	notificationId: NotificationId,
	setIsClosing: (isClosing: boolean) => void
): (() => void) => {
	const dispatch = useDispatch();

	return () => {
		setIsClosing(true);

		setTimeout(() => {
			dispatch(hideNotification(notificationId));
		}, ANIMATION_DURATION);
	};
};

const useIsClosing = (
	notificationId: NotificationId,
	isExpirable: boolean,
	duration: number = NOTIFICATION_TTL
): [boolean, () => void] => {
	const [isClosing, setIsClosing] = useState(false);
	const hideNotification = useCallback(
		useHideNotification(notificationId, setIsClosing),
		[notificationId]
	);

	useEffect(() => {
		const timeout = isExpirable && setTimeout(hideNotification, duration);
		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, []);

	return [isClosing, hideNotification];
};

export default function NotificationList(): JSX.Element {
	const notifications = useSelector(
		(state: RootState) => state.notifications
	);
	

	const handleClick = (
		id: number,
		isExpirable: boolean,
		duration?: number
	) => {
		return useIsClosing(id, isExpirable, duration);
	};

	return (
		<List>
			{Object.entries(notifications).map(
				([notificationId, notification]) => {
					return (
						<Notification
							key={notificationId}
							notification={notification}
							notificationId={+notificationId}
							generateHandle={() =>
								handleClick(
									+notificationId,
									notification.isExpirable,
									notification.duration
								)
							}
						/>
					);
				}
			)}
		</List>
	);
}

const List = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.4rem;
`;
