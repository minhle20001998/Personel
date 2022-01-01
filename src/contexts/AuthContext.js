import React, { useContext } from 'react'
import { myAxios } from '../utils/axios';

const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    // const [currentUser, setCurrentuser] = useState();

    const signUp = async (username, password) => {
        const { data } = await myAxios.post('/auth/register', { username, password })
        return data;
    }


    const logIn = async (username, password) => {
        const { data } = await myAxios.post('/auth/login', { username, password })
        if (data) {
            const { refreshToken, token } = data;
            localStorage.setItem("refreshToken", refreshToken)
            localStorage.setItem("token", token)
        }
        return data;
    }

    const logOut = async () => {
        const { data } = await myAxios.post('/auth/logout')
        if (data) {
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("token")
        }
        return data;
    }

    const value = {
        signUp,
        logIn,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
