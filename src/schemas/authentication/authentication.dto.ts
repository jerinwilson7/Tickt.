import {z} from 'zod';
import {loginSchema, registerSchema} from './authentication.schema';

export type SignInForm = z.infer<typeof loginSchema>;
export type SignUpForm = z.infer<typeof registerSchema>;
