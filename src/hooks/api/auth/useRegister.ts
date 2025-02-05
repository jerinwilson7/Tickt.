import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/axios';
import { ROUTES } from '../../../constants';

type RegisterProps = {
  email: string;
  uid: string;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({email, uid}: RegisterProps) => {
      try {
          const response = await axiosInstance.post(ROUTES.register,{email,uid});
          return response;
      } catch (error) {
        console.log("error",error)
      }
    },
  });
};
