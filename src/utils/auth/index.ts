import { GetServerSidePropsContext } from "next";
import nookies from 'nookies';
import { firebaseAdmin } from "utils/db/admin";
import { REDIRECT_ROUTE_UNAUTHENTICATED } from "config";

export const isAuthenticated = async (ctx: GetServerSidePropsContext) => {
    try {
		const cookies = nookies.get(ctx);
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		return token;
	} catch (err) {
		ctx.res.writeHead(302, { Location: REDIRECT_ROUTE_UNAUTHENTICATED });
		ctx.res.end();

		return null;
	}
}
