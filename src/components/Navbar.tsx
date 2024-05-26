"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
    const {data: session} = useSession()
    // console.log(data,'d')
    console.log(session,'session in navbar')

    const user: User = session?.user as User

  return (
    // <div>Navbar</div>
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <a href="#" className="text-xl font-bold mb-4 md:mb-0">Mystry message</a>
            {
                session ? (
                    <>
                      <span className="mr-4">Welcome, {user?.username || user.email}</span>
                      <Button onClick={()=> signOut()}  className="w-full md:w-auto bg-slate-100 text-black">Logout</Button>
                    </>
                ) : (
                    <>
                      <Link href='/sign-in'>
                        <Button className="w-full md:w-auto bg-slate-100 text-black">Login</Button>
                      </Link>
                    </>
                )
            }
        </div>
    </nav>

  )
}

export default Navbar