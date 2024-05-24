"use client"
import {MessageCard} from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Message } from '@/model/User'
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-separator'
import { Switch } from '@radix-ui/react-switch'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const {toast} = useToast()

  // // to delete messages
  // const handleDeleteMessage = (messageId: string) => {
  //      setMessages(messages.filter((message)=> message._id !== messageId))
  // } 

  const {data: session} = useSession();
  console.log(session,'data session')

  const form = useForm({ // useForm hook from react-hook-form creates a form object named form.
    resolver: zodResolver(AcceptMessageSchema) // zodResolver function (likely from @hookform/resolvers/zod) integrates form validation with Zod library
  })
  // console.log(form,'form after zod resolver')

  const {register,watch, setValue} = form  // Destructures functions from form: register, watch, setValue for registering form fields, watching field values, and setting field values programmatically.
  // console.log(form,'form after destructure');

  const acceptMessages = watch('acceptMessages')   //This part of the code is using the watch function from React Hook Form. It's watching the input field named 'acceptMessages' in your form.


  // const fetchAcceptMessage = useCallback(async () => { //useCallback is a React Hook that allows you to memoize a function. It returns a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.
  //   setIsSwitchLoading(true)
  //   try{
  //     const response = await axios.get('/api/accept-messages')
  //     setValue('acceptMessages', response.data.isAcceptingMessage)
  //   }catch(error){
  //     const axiosError = error as AxiosError<ApiResponse>;
  //     toast({
  //       title:"Error",
  //       description: axiosError.response?.data.message || "Failed to fetch message settings",
  //       variant: "destructive"
  //     })
  //   } finally {
  //     setIsSwitchLoading(false)
  //   }
  // },[])

  // // Getting messages from backend to show in frontend
  // const fetchMessages = useCallback( async (refresh: boolean = false)=>{
  //   setIsLoading(true)
  //   setIsSwitchLoading(false)
  //   try{
  //    const response =  await axios.get<ApiResponse>('/api/get-messages')
  //    setMessages(response.data.messages || [])
  //    if(refresh){ //Optionally displays a toast notification if refresh is true.
  //     toast({
  //       title:"Refresh Messages",
  //       description:"Showing latest messages",
  //       variant: "destructive"
  //     })
  //    }
  //   }
  //   catch(error){
  //     const axiosError = error as AxiosError<ApiResponse>;
  //     toast({
  //       title:"Error",
  //       description: axiosError.response?.data.message || "Failed to fetch messages",
  //       variant: "destructive"
  //     })
  //   }
  //   finally {
  //     setIsLoading(false)
  //     setIsSwitchLoading(false)
  //   }
  // },[setIsLoading, setMessages]);


  //  useEffect(()=> {
  //   if(!session || !session.user) return
  //   fetchMessages()
  //   fetchAcceptMessage()
  //  },[session, setValue, fetchAcceptMessage, fetchMessages]);


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

  // const {username} = session?.user as User
  // const baseUrl = `${window.location.protocol}//${window.location.host}`
  // const profileUrl = `${baseUrl}/u/${username}`

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(profileUrl)   //This is a built-in object in browsers that allows you to interact with the user's clipboard, meaning you can copy text to it.  Here, .writeText() is a method provided by navigator.clipboard. It takes an argument, in this case profileUrl, which is the text you want to copy to the clipboard.
  //   toast({
  //     title:"URL copied",
  //     description: "Profile URL has been copied to clipboard"
  //   })
  // }

  // if(!session || !session.user){
  //  return( <div>
  //    <h1>Please Login</h1>
  //  </div>
  // )}



  return (
    <>
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

          {/* <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
          <div className="flex items-center">
            <input
              type="text"
              // value={profileUrl}
              disabled
              className="input input-bordered w-full p-2 mr-2"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>  */}

        <div className="mb-4">
          <Switch
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            Accept Messages: {acceptMessages ? 'On' : 'Off'}
          </span>
        </div>
      {/* <Separator /> */}
      {/* <Button className="mt-4" variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button> */}

        {/*<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages to display.</p>
          )}
        </div> */}
      </div>
    </>
  )
}

export default page

