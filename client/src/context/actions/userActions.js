export const setUserDetails = (user) => {
    return{
        type: "SET_USER",
        user
    };
};

export const resetUserDetails = () => {
    return{
        type: "RESET_USER",
        user: null
    };
};

export const getUserDetails = () => {
    return{
        type : 'GET_USER'
    };
};