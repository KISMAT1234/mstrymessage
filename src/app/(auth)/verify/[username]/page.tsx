import { useToast } from '@/components/ui/use-toast'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

const VerifyAccount = () => {
    const router = useRouter()
    const param = useParams<{username: string}>()
    // const {toast} = useToast

    return(
        <>
          <div></div>
        </>
    )
}