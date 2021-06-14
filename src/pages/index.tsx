import Button from '@material-ui/core/Button';
import { Layout } from 'components/layout';
import Head from 'next/head';
import { Fragment, ReactNode, useState } from 'react';
import styled from 'styled-components';
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemProps,
	ListItemText,
} from '@material-ui/core';
import { Inbox, Drafts } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import LangToolbar from 'shared/langToolbar';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps (ctx: GetServerSidePropsContext) {
	console.log('ServerProps Working');
	ctx.res.writeHead(302, { Location: 'http://www.google.com' });
	ctx.res.end();
	return {
		props: {
			message: "Fabian"
		}
	}
}
export default function Home() {
	const { t } = useTranslation();
	const router = useRouter();

	const headerContent: ReactNode = (
		<HeaderWrapper>
			<h2>{t("Let's celebrate all together!")}</h2>
			<p>{t('Bring feelings close')}</p>
		</HeaderWrapper>
	);

	const goToLogin = () => router.push('/login');
	const goToRegister = () => router.push('/register');


	const [isDrawerOpen, setDrawerOpen] = useState(false);
	return (
		<Fragment>
			<Head>
				<title>{t('Welcome to React')}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout header={headerContent}>
				<ImageWrapper>
					<Image src='/assets/home-image.png' alt='MyCompany' />
				</ImageWrapper>

				<ActionWrapper>
					<Button
						variant='contained'
						color='primary'
						onClick={goToLogin}
					>
						{t('Sign In')}
					</Button>
					<Button variant='contained' onClick={goToRegister}>
						{t('Create an account')}
					</Button>
					<LangToolbar />
				</ActionWrapper>
			</Layout>
			<Drawer
				open={isDrawerOpen}
				onClose={() => setDrawerOpen(!isDrawerOpen)}
			>
				<ListStyled component='nav' aria-label='main mailbox folders'>
					<ListItem button>
						<ListItemIcon>
							<Inbox />
						</ListItemIcon>
						<ListItemText primary='Inbox' />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Drafts />
						</ListItemIcon>
						<ListItemText primary='Drafts' />
					</ListItem>
				</ListStyled>
				<Divider />
				<ListStyled
					component='nav'
					aria-label='secondary mailbox folders'
				>
					<ListItem button>
						<ListItemText primary='Trash' />
					</ListItem>
					<ListItemLink href='#simple-list'>
						<ListItemText primary='Spam' />
					</ListItemLink>
				</ListStyled>
			</Drawer>
		</Fragment>
	);
}

const ActionWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: 1rem;
	margin-top: 2rem;
	gap: 1rem;
`;

const ImageWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	// margin-top: 1rem;
`;

const Image = styled.img`
	display: block;
	width: 40vh;
`;

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	padding: 1rem;

	h2 {
		font-size: var(--font-size-h2);
		margin: 0.5rem;
	}
	p {
		color: var(--colors-gray);
		margin: 0.5rem;
		font-size: var(--font-size-subtitle);
	}
`;

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
	return <ListItem button component='a' {...props} />;
}

const ListStyled: typeof List = styled(List)`
	width: 70vw;
`;
