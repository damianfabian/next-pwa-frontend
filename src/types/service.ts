import { ErrorType } from "types";
import firebase from 'firebase/app';
import db from 'utils/db/client';

export type ResponseType<Type> = Type | ErrorType;
export type FBUser = firebase.User;