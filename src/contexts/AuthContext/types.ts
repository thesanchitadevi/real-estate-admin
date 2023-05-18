import { IUserId } from "@/types";

export type IToken = string | null;

export type IUser = {
	id: IUserId;
	firstName: string | null;
	lastName: string | null;
	fullName?: string | null;
	username: string | null;
	createdAt: string | null;
};

export type IAuthContext = {
	isLoggedIn: boolean;
	token: IToken;
	setToken: (token: IToken, remember: boolean | false) => void;
	user: IUser;
	isLoading: boolean | false;
	login: (email: string, password: string, remember: boolean | false) => void;
	isLoginLoading: boolean;
	logout: () => void;
	isLogoutLoading?: boolean;
};
