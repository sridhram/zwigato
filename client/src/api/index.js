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

export const addNewItem = async (data) => {
    try{
        const response = await fetch(`${baseURL}/api/products/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch(err){
        return null;
    }
}

export const getAllProducts = async () => {
    try{
        const response = await fetch(`${baseURL}/api/products/all`);
        return response;
    } catch(err){
        return null;
    }
}

export const deleteProduct = async (productId) => {
    try{
        const response = await fetch(`${baseURL}/api/products/${productId}`,{
            method: 'DELETE'
        });
        return response;
    } catch(err){
        return err;
    }
}

export const editItem = async (data, productId) => {
    try {
        const response = await fetch(`${baseURL}/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (err) {
        return null;
    }
}