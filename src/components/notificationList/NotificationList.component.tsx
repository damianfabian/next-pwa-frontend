import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import Notification from './notification';
import styled from 'styled-components';
// import styles from './NotificationList.module.scss';

// const { notificationList } = styles;

export const ANIMATION_DURATION = 200;
export const NOTIFICATION_TTL = 5000;

export default function NotificationList(): JSX.Element {
    const notifications = useSelector((state: RootState) => state.notifications);
    const cssVariables = { '--animation-duration': `${ANIMATION_DURATION}ms` } as CSSProperties;

    return (
        <List
          style={ cssVariables }
        >
            {
                Object.entries(notifications).map(
                    ([notificationId, notification]) => (
                        <Notification
                          key={ notificationId }
                          notificationId={ +notificationId }
                          notification={ notification }
                        />
                    )
                )
            }
        </List>
    );
}

const List = styled.ul`
position: absolute;
top: 0;
left: 0;
`;

