export const setUserDetails = (user) => {
    return {
        type: "SET_ALL_USER",
        user
    };
};

export const getUserDetails = () => {
    return {
        type: 'GET_ALL_USER'
    };
};