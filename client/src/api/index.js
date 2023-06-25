export const baseURL = "http://127.0.0.1:5001/zwigato-server/us-central1/app";

export const authenticateUser = async (token) => {
    try{
        const response = await fetch(`${baseURL}/api/users/auth`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        const userData = await response.json();
        
        return userData.data;
    } catch(err){
        return null;
    }
}