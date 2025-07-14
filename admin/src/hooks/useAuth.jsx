import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth.api.js";

function useLogin({onSuccess, onError}){
    return useMutation({
        mutationFn: ({ username, password }) => authServices.handleLogin(username, password),
        onSuccess,
        onError
    })
}
export default {
    login: useLogin
}