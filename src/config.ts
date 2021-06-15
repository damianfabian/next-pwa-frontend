/*
 * IOS Status bar value.
 * Define which status bar style to use.
 *
 * You can read more about these here,
 * under the apple-mobile-web-app-status-bar-style:
 * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
 */
export const statusBarStyle = 'black-translucent';

export const languages = [
    {
        display: 'EN',
        code: 'EN',
    },
    {
        display: 'NL',
        code: 'NL',
    },
]

export const ROUTE_HOME = '/home';
export const ROUTE_UNAUTHENTICATED = '/login';
export const ROUTE_UNAUTHORIZED = '/home?unauthorized=1';
export const DEFAULT_ROLE = 'user';
export const BASE_API = 'http://localhost:3000/api';

export const ENDPOINTS = {
    AUTH: {
        REGISTER: `${BASE_API}/v1/auth/register`
    }
}