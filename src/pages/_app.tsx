import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'contexts/theme';
import NotificationList from 'components/notificationList';
import store from 'stores';
import 'styles/theme.css';
import { Provider } from 'react-redux';
import { statusBarStyle } from 'config';
import { AppProps } from 'next/app';
import  { Init } from '../i18n';
import { LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();
	const [lngInit, setLngInit] = useState(false);

	useEffect(() => {
		Init(router.locale).then(() => setLngInit(true));
	}, []);

	if (!lngInit) {
		return <LinearProgress />;
	}

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, viewport-fit=cover'
				/>
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content={statusBarStyle}
				/>
				<link
					rel='apple-touch-startup-image'
					sizes='512x512'
					href='/logo512.png'
				/>
				<link
					rel='apple-touch-startup-image'
					sizes='256x256'
					href='/logo256.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='512x512'
					href='/logo512.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='256x256'
					href='/logo256.png'
				/>
				<link rel='manifest' href='/manifest.json' />
			</Head>
			<Provider store={store}>
				<ThemeProvider>
					<NotificationList />
					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		</>
	);
}
