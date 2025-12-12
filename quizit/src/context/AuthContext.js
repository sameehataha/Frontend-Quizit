import { createContext,useContext, useEffect, useReducer} from "react"
import { authReducer } from "../reducer/AuthReducer";
 const initialState = {
        username: "sameeha",
        password: "12345",
        emailId: "st@gmail.com",
        token: localStorage.getItem("token") || null,
        
    }
const AuthContext = createContext();
const AuthProvider = ({children}) => {
    useEffect(() => {
        const token = localStorage.getItem("token")
        authDispatch({
            type: "INITIAL_STATE",
            payload: token
        })
    },[])
    const [{username,password,emailId,token}, authDispatch] = useReducer(authReducer, initialState)
    const logout = () => {
    authDispatch({ type: "LOGOUT" });
  };
    return (
      <AuthContext.Provider value={{username,password,emailId,token,logout,authDispatch}}>
        {children}
    </AuthContext.Provider>
    ) 
    
}
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }