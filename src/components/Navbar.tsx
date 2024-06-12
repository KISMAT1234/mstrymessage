"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Input } from "@/components/ui/input"
import  { useState } from 'react';
import { AlignJustify } from 'lucide-react';
import { X } from 'lucide-react';


import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
    const {data: session} = useSession()
    // console.log(data,'d')
    // console.log(session,'session in navbar')

    const user: User = session?.user as User
    console.log(user,'user in navbar')


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    {isOpen && (
      <div className="h-[100vh] px-5 py-5 w-[60%] bg-red-600 z-50   md:block absolute transform transition-transform duration-300 ease-in-out ">
        <div className="flex justify-between">
          <a href="#" className="text-xl font-bold md:absolute md:block ">Mystry message</a>
          <button onClick={toggleSidebar}>
            <X className="text-4xl"/>
          </button>
        </div>
        <div className="my-5">
           <Input type="email" placeholder="Search messages here..." className=""/>
        </div>
        <div className="flex ">
          <Youtube className="h-[10vh] w-[10vh] mx-2 md:w-auto bg-slate-100 text-black rounded"/>
          <Instagram className="h-[10vh] w-[10vh] mx-2 md:w-auto bg-slate-100 text-black rounded"/>
          <Facebook className="h-[10vh] w-[10vh] mx-2 md:w-auto bg-slate-100 text-black rounded"/> 
        </div>
        <div className="flex md:absolute my-5">
            <Button onClick={()=> signOut()}  className="w-full md:w-auto bg-slate-100 text-black">Logout</Button>
        </div>
      </div>
    )}
    <nav className="px-4 py-2 md:p-3 shadow-md bg-gray-900 text-white flex md:block">
      {/* <div className="md:hidden"> */}
        <button onClick={toggleSidebar} className="md:hidden">
           <AlignJustify className="text-4xl"/>
        </button>
      {/* </div> */}
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="text-center">
          {
              session ? (
                  <>
                    <span className="mr-4">Welcome, {user?.username || user.email}</span>
                  </>
              ) 
              : (
                <>
                 <h1>Not loggedin</h1>
                </>
              )
          }
        </div>
        <div>
           <NavigationMenu>
             <NavigationMenuList>
               <NavigationMenuItem>
                 <NavigationMenuTrigger  className="bg-gray-900">
                   <a href="/dashboard">Home</a>
                 </NavigationMenuTrigger>
               </NavigationMenuItem>
      
               <NavigationMenuItem>
                 <NavigationMenuTrigger className="bg-gray-900">Messages</NavigationMenuTrigger>
                 <NavigationMenuContent>
                   <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                     <ListItem href="/messages/latest-messages" title="Latest-Messages">
                     </ListItem>
                     <ListItem href="/docs/installation" title="Highest-Like-Messages">
                     </ListItem>
                     <ListItem href="/docs/primitives/typography" title="Funny_Messages">
                     </ListItem>
                   </ul>
                 </NavigationMenuContent>
               </NavigationMenuItem>
      
               <NavigationMenuItem>
                 <NavigationMenuTrigger className="bg-gray-900">Blog</NavigationMenuTrigger>
                 <NavigationMenuContent>
                   <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                     <ListItem href="/docs" title="Introduction">
                     </ListItem>
                     <ListItem href="/docs/installation" title="Installation">
                     </ListItem>
                     <ListItem href="/docs/primitives/typography" title="Typography">
                     </ListItem>
                   </ul>
                 </NavigationMenuContent>
               </NavigationMenuItem>
               
               <NavigationMenuItem>
                 <NavigationMenuTrigger className="bg-gray-900">Contact</NavigationMenuTrigger>
                 <NavigationMenuContent>
                   <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                     <ListItem href="/docs" title="Introduction">
                     </ListItem>
                     <ListItem href="/docs/installation" title="Installation">
                     </ListItem>
                     <ListItem href="/docs/primitives/typography" title="Typography">
                     </ListItem>
                   </ul>
                 </NavigationMenuContent>
               </NavigationMenuItem>
             </NavigationMenuList>
           </NavigationMenu>
         </div>
         <div className=" hidden md:block">
          <button>
            <Youtube className="h-[7vh] w-[10vh] mx-2 md:w-auto bg-slate-100 text-black rounded hover:text-red-600"/>
          </button>
          <button>
            <Instagram className="h-[7vh] w-[10vh] mx-2 md:w-auto bg-slate-100 text-black rounded hover:text-red-500"/>
          </button>
          <button>
             <Facebook className="h-[7vh] w-[10vh] mx-2 md:w-auto bg-slate-100 text-black rounded hover:bg-blue-500"/> 
          </button>

        </div>
        <div>
           <Input type="email" placeholder="Search messages here..." className="hidden w-full text-black md:block"/>
        </div>
      </div>
    </nav>
    
    
  </>
  )
}

export default Navbar

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
















