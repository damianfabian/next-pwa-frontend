import { getWindowProperty } from 'utils/browser';

const checkMediaProp = (mediaQueryString: string): boolean => {
    const { matchMedia } = getWindowProperty();

    return (
        matchMedia
        && matchMedia(`(${mediaQueryString})`).matches
        || false
    );
};

export default checkMediaProp;