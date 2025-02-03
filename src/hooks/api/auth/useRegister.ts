import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type RegisterProps = {
  email: string;
  uid: string;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({email, uid}: RegisterProps) => {
      console.log('MUTATE');
      try {
          const response = await axios.post(
            `http://192.168.0.213:8080/auth/register`,
            {
              email,
              uid,
            },
          );
          console.log('MUTATE', response.status);
          return response;
      } catch (error) {
        console.log("error",error)
      }
    },
  });
};
