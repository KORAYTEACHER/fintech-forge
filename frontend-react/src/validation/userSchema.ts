import { z } from "zod";

// Schema for Signup Validation
// username :- A-Z, a-z, 0-9, _ (underscore)
// email :- Valid email address
// password :- Minimum 8 characters. Maximum 16 characters.
export const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, "Username must be at most 15 characters")
    .regex(/^(?!.*__)(?!.*_$)[A-Za-z0-9_]{1,30}$/, {
      message:
        "Username can only contain letters, numbers, and underscores, with no spaces or special characters.",
    }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export type signupUser = z.infer<typeof signupSchema>;

// Schema for Login Validation
// email :- Valid email address
// password :- Minimum 8 characters. Maximum 16 characters.
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export type loginUser = z.infer<typeof loginSchema>;



export const resetPasswordSchema = z.object({
 password: z.string()
    .min(8, 'Password must be at least 8 characters long.'), 
  confirmPassword: z.string()
    .min(1, 'Please confirm your password.') 
}) .refine((val) => val.password === val.confirmPassword, {
  message: 'Passwords do not match.',
  path: ["confirmPassword"]
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const emailSchema =  z.object({
  email: z.string().email("Please provide a valid email address")
});

export type emailFormData = z.infer<typeof emailSchema>;