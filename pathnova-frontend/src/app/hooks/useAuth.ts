import { loginUser, registerUser } from "@/service/authService";
import { setToken } from "@/app/utils/tokenManager";

export const useAuth = () => {

  const login = async (email:string,password:string) => {

    const data = await loginUser({email,password})

    setToken(data.token)

    return data

  }

  const register = async (name:string,email:string,password:string) => {

    const data = await registerUser({name,email,password})

    return data

  }

  return {login,register}

}