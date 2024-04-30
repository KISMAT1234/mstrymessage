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


  

  return (
    <div>
      Page
    </div>
  )
}

export default page