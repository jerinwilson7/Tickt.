import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axios";
import { ROUTES } from "../../../constants";
import { CustomError } from "../../../utils/error";

type LoginProps = {
    uid:string;
    email:string;
    token:string
}


export const useLogin = () => {
  return useMutation({
    mutationFn: async ({email, token, uid}: LoginProps) => {
      try {
        const loginResponse = await axiosInstance.post(ROUTES.login, {
          email,
          token,
          uid,
        });
        return loginResponse;
      } catch (error:any) {
        if (error.response) {
          throw new CustomError(error.response.data.message,400)
        }
      }
    },
  });
};
