import styled from 'styled-components';
import Notification, { NotificationId } from 'components/notification';
import { removeNotification, notiSelector } from './notificationSlice';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/store';

export const ANIMATION_DURATION = 500;
export const NOTIFICATION_TTL = 5000;

const useHideNotification = (
	notificationId: NotificationId,
	setIsClosing: (isClosing: boolean) => void
): (() => void) => {
	const dispatch = useAppDispatch();

	return () => {
		setIsClosing(true);

		setTimeout(() => {
			dispatch(removeNotification(notificationId));
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

type NotificationProps = {
	animationTime?: number;
}

export default function NotificationList({ animationTime = ANIMATION_DURATION} : NotificationProps): JSX.Element {
	const notifications = useAppSelector(notiSelector);
	
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
							animationTime={animationTime}
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
