import {z} from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'The password must be at least 8 characters long')
    .max(32, 'The password must be a maximum 32 characters'),
});

export const loginSchema = authSchema;
export const registerSchema = authSchema;