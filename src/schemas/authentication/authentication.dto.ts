import {z} from 'zod';
import {loginSchema, registerSchema} from './authentication.schema';

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
