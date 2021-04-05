import handleFetchError from './handleFetchError';

const getRequest = (request: RequestInfo): Promise<any> => (
    fetch(request)
        .then(res => res.json())
        .catch(handleFetchError)
);

export default getRequest;