import Button from '@material-ui/core/Button';
import { Layout } from 'components/layout';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { authSelector, singUp } from 'features/auth/authSlice';
import { useRouter } from 'next/router';
import LangToolbar from 'shared/langToolbar';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { UserType } from 'types';


export default function Register() {
	const { t, i18n } = useTranslation();
	const auth = useAppSelector(authSelector);
	const dispatch = useAppDispatch();

	const router = useRouter();

	const goToLogin = () => router.push('/login');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');
	const [name, setName] = useState('');

	const headerContent: ReactNode = (
		<HeaderWrapper>
			<Title>{t('Register')}</Title>
		</HeaderWrapper>
	);

	const register = () => {
		const data: UserType = { email, password, name };
		dispatch(singUp(data));
	};

	if (auth.isLogin) {
		router.push('/home');
	}

	return (
		<Body>
			<Head>
				<title>{t('Register')}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout header={headerContent}>
				<Card>
					<TextField
						id='outlined-name-input'
						label='Name'
						type='text'
						variant='outlined'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						id='outlined-email-input'
						label='Email'
						type='email'
						variant='outlined'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						id='outlined-password-input'
						label='Password'
						type='password'
						variant='outlined'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						id='outlined-password-input'
						label='Repeat Password'
						type='password'
						variant='outlined'
						value={repassword}
						onChange={(e) => setRepassword(e.target.value)}
					/>
					<Actions>
						<Button
							variant='contained'
							color='primary'
							onClick={register}
						>
							{t('Create an account')}
						</Button>
						<StyledButton variant='contained' onClick={goToLogin}>
							{t('Sign In')}
						</StyledButton>
					</Actions>
					<LangToolbar />
				</Card>
			</Layout>
		</Body>
	);
}

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;

	h1 {
		font-size: var(--font-size-h1);
		margin: 0.5rem;
	}
	p {
		color: var(--colors-gray);
		margin: 0.5rem;
		font-size: var(--font-size-subtitle);
	}
`;

const Body = styled.div`
	background: conic-gradient(
		#98d6f3,
		#fea2b1,
		#f7f1fa,
		#f7f1fa,
		#98d6f3,
		#98d6f3
	);
	backdrop-filter: blur(20px);
	height: 100vh;
	padding: 4rem 1rem 0 1rem;
`;

const Card = styled.div`
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(30px);
	padding: 1rem;
	border-radius: 1rem;
	border: 1px solid rgba(255, 255, 255, 0.2);
	min-height: 300px;
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 2rem;
	gap: 1rem;
`;

const Actions = styled.div`
	display: flex;
	align-self: bottom;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1rem;
`;

const StyledButton = styled(Button)`
	text-decoration: none;
	border-radius: 4px;
	background-color: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(30px);
	color: rgba(120, 120, 120, 0.8);
	&:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const Title = styled.h1`
	color: rgba(255, 255, 255, 0.8);
`;
