"use client"

import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/router"
import { signUpSchema } from "@/schemas/signupSchema"
import axios, {AxiosError} from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


const page = () => {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceValue(username, 500)
  const { toast } = useToast()
  
  const router = useRouter()
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email:'',
      password:''
    }
  })

  useEffect(()=>{
    const checkUsernameUnique = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try{
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message);
        }catch(error){
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          ) 
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  },[debouncedUsername])


  const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try{
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      toast({
        title: 'Success',
        description: response.data.message
        // status:'success',
        // duration: 5000,
        // isClosable: true,
        // position: 'top-right'
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    }catch(error){
      console.error("Error in signup of user",error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast({
        title: 'Signup Failed',
        description: errorMessage,
        variant:"destructive"
      })
      setIsSubmitting(false)


      
    }

    console.log(data,'data of submit');
  }


  return (
    <>
       <div className="">
          <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

             <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Username</FormLabel>
                   <FormControl>
                     <Input placeholder="username"
                      {...field} 
                      onChange={(e)=>{
                        field.onChange(e)
                        setUsername(e.target.value)
                      }}/>
                   </FormControl>
                
                   <FormMessage />
                 </FormItem>
               )}
             />
            
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Email</FormLabel>
                   <FormControl>
                     <Input placeholder="email"
                      {...field} 
                     />
                   </FormControl>
                
                   <FormMessage />
                 </FormItem>
               )}
             />

              <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Password</FormLabel>
                   <FormControl>
                     <Input placeholder="password"
                      {...field} 
                     />
                   </FormControl>
                
                   <FormMessage />
                 </FormItem>
               )}
             />

             <Button type="submit" disabled={isSubmitting}>
               {
                isSubmitting ? (
                  <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                  </>
                ) : ('signup')
               }
             </Button>
             <div>
               <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                 Sign in 
               </Link>
             </div>
             </form>
          </Form>
       </div>
    </>
  )
}

export default page



