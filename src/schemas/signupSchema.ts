import {z} from 'zod'

export const usernameValidation = z
  .string()
  .min(2,"Username must be at least 2 characters")
  .max(20,"Username must be less than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special chracter")

  export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be less than 20 characters"),
  })

  