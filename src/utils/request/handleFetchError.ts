import store from 'store';
import { addNotification } from 'stores/notifications/notiSlice';

const ErrorHandler = (err: Error): Promise<any> => {
    // eslint-disable-next-line
    console.error(err);

    store.dispatch(
        addNotification({
            message: '⚠️ There was an error while fetching response.',
            isExpirable: true
        })
    );

    return Promise.reject();
};

export default ErrorHandler;