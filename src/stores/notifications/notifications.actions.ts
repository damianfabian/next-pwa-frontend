export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export type NotificationId = number;

export interface Notification {
    message: string,
    type?: 'error' | 'info' | 'warning' | 'success',
    duration?: number,
    isExpirable: boolean
}

export interface AddNotificationAction {
    type: typeof ADD_NOTIFICATION,
    notification: Notification
}

export interface HideNotificationsAction {
    type: typeof HIDE_NOTIFICATION,
    notificationId: NotificationId
}

export type NotificationsActions = AddNotificationAction | HideNotificationsAction;

export const addNotification = (notification: Notification): AddNotificationAction => ({
    type: ADD_NOTIFICATION,
    notification
});

export const hideNotification = (notificationId: NotificationId): HideNotificationsAction => ({
    type: HIDE_NOTIFICATION,
    notificationId
});
