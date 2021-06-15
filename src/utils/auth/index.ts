import { GetServerSidePropsContext } from "next";
import nookies from 'nookies';
import { firebaseAdmin } from "utils/db/admin";
import { DEFAULT_ROLE, ROUTE_UNAUTHENTICATED, ROUTE_UNAUTHORIZED } from "config";

export const isAuthenticated = async (ctx: GetServerSidePropsContext, roles: string[] = [DEFAULT_ROLE]) => {
	try {
		const cookies = nookies.get(ctx);
		const tokenData = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		if (tokenData) {
			const user = await firebaseAdmin.auth().getUser(tokenData.uid);
			const userRole = user.customClaims ? user.customClaims["role"] : DEFAULT_ROLE;

			if (roles.includes(userRole)) {
				return {
					props: {
						uid: tokenData.uid,
						customClaims: user.customClaims
					}
				}
			}
			//user does not have the role to see the page
			return {
				redirect: {
					destination: ROUTE_UNAUTHORIZED,
					permanent: false,
				},
			}
		}

		//user it's not loging
		return {
			redirect: {
				destination: ROUTE_UNAUTHENTICATED,
				permanent: false,
			},
		}

	} catch (err) {
		//in case of any error, redirect to login
		return {
			redirect: {
				destination: ROUTE_UNAUTHENTICATED,
				permanent: false,
			},
		}
	}
}
