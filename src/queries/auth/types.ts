// Login type
export type ILogin = {
	email: string;
	password: string;
};

// Update data type
export type IUpdateUser = {
	username: string;
	firstName: string;
	lastName: string;
};

// Registration type
export type ISignup = {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
