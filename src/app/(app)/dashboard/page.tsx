"use client"
import { useToast } from '@/components/ui/use-toast'
import { Message } from '@/model/User'
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
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

  


  return (
    <div>Dashboard</div>
  )
}

export default page