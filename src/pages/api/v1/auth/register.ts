import { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "types";
import { firebaseAdmin } from "utils/db/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const data: UserType = req.body;

        if (!data || !data.email || !data.password) {
            return res.status(400).send({ error: { message: "Bad request", code: "auth/badRequest" } });
        }

        const hasSaved = await firebaseAdmin.auth().createUser({
            email: data.email,
            password: data.password,
            displayName: data.name,
            disabled: false,
            emailVerified: false,
        });

        await firebaseAdmin.auth().setCustomUserClaims(hasSaved.uid, {
            role: 'user'
        });

        res.status(200).send({ uid: hasSaved.uid });
    } catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);

        let data = { error: { message: errorMessage, code: errorCode } };

        if (errorCode == 'auth/weak-password') {
            data.error.message = 'Your password is too weak';
        }

        res.status(400).send(data);
    }
}