"use client"
import { useToast } from '@/components/ui/use-toast'
import { Message } from '@/model/User'
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const {toast} = useToast()

  const handleDeleteMessage = (messageId: string) => {
       setMessages(messages.filter((message)=> message._id !== messageId))
  } 

  const {data: session} = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema)
  })

  const {register,watch, setValue} = form

  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try{
      const response = await axios.get('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessage)
    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title:"Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive"
      })
    } finally {
      setIsSwitchLoading(false)
    }
  },[])

  const fetchMessages = useCallback( async (refresh: boolean)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try{
     const response =  await axios.get<ApiResponse>('/api/get-messages')
     setMessages(response.data.messages || [])
     if(refresh){
      toast({
        title:"Refresh Messages",
        description:"Showing latest messages",
        variant: "destructive"
      })
     }
    }
    catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title:"Error",
        description: axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive"
      })
    }
    finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading, setMessages]);


   useEffect(()=> {
    if(!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
   },[session, setValue, fetchAcceptMessage, fetchMessages]);


   const handleSwitchChange = async ()=> {
     try{
      const response = await axios.post<ApiResponse>('/api/accept-messages',{
        acceptMessages: !acceptMessages,
      })
      setValue('acceptMessages', !acceptMessages)
      toast({
        title: response.data.message,
        variant: "default"
      })
     }
     catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title:"Error",
        description: axiosError.response?.data.message || "Failed to fetch messages settings",
        variant: "destructive"
      })
     }
   }

   if(!session || !session.user){
    return( <div>
      <h1>Please Login</h1>
    </div>
   )}


  return (
    <div>Dashboard</div>
  )
}

export default page