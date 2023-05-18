import useAuth from "../useAuth";

const useUser = () => {
	const { user } = useAuth();
	return {
		...user,
		fullName: !!user?.firstName ? `${user?.firstName} ${user?.lastName}` : null,
	};
};

export default useUser;
