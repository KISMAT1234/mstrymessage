"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useToast } from './ui/use-toast'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Message } from '@/model/User'
import dayjs from 'dayjs'
import { User } from 'lucide-react';
import { Star } from 'lucide-react';

import { Copy } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
  

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}
export const MessageCard = ({message, onMessageDelete}: MessageCardProps) => {
    const {toast} = useToast();

    const handleDeleteConfirm = async() => {
        const response =await axios.delete<ApiResponse>(`/api/messages/${message._id}`)
        toast({
            title: response.data.message
        })
        onMessageDelete(message._id)
    }

  return (
     <>
      <Card className="card-bordered h-[40vh] px-5 py-5">
        <div className="flex justify-between items-center">
          <div className="flex text-2xl font-light">
            <User/>
            <h1 className="ml-1">anonymous message</h1>
          </div>
          <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
        </div>
        <div className="my-5 font-normal">
          <CardTitle>{message.content}</CardTitle>
        </div>
        <div className="flex justify-between mt-10">
          <div className="text-sm">
            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
          </div>
          <div>
          <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          </div>
          <button className="text-sm">
             <Star color="gray-900" fill="gray-900" size={45}/>
          </button>
        </div>
      <CardContent></CardContent>
    </Card>
      
    </>
  )
}



