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
         <div>
            <Input type="email" placeholder="Search messages here..." className="hidden w-[60%] md:block"/>
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
















//   <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
//   <div className="flex items-center">
//     <button className="lg:hidden mr-2" onClick={toggleSidebar}>
//       {/* Sidebar toggle button icon */}
//       <svg
//         className="w-6 h-6 fill-current"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* Sidebar icon */}
//         {isOpen ? (
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zm-1 6h-5V7h5v3zm0 2h-5v3h5v-3zm-7-2v-3H7v3h3zm0 2v3H7v-3h3z"
//           />
//         ) : (
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm1 0a1 1 0 011-1h10a1 1 0 011 1v2H5V5zm0 3h10v9H5V8zm0 10a1 1 0 011-1h10a1 1 0 011 1v2H5v-2z"
//           />
//         )}
//       </svg>
//     </button>
//     {/* Logo */}
//     <a href="/">
//       <img src="/path/to/logo.png" alt="Logo" className="h-8" />
//     </a>
//   </div>
//   {/* Navigation links */}
//   <nav className="hidden lg:flex space-x-4">
//     <a href="/">Home</a>
//     <a href="/about">About</a>
//     <a href="/contact">Contact</a>
//   </nav>
//   {/* Logout button for large screens */}
//   <button className="hidden lg:block">Logout</button>
//   {/* Sidebar */}
//   {isOpen && (
//     <div className="fixed inset-0 bg-green-500 bg-opacity-75 flex justify-end z-50">
//       <div className="w-80 bg-blue-600 h-full transform translate-x-0 lg:translate-x-full transition-transform duration-900 ease-in-out">
//         {/* Sidebar content */}
//         <div className="flex flex-col items-start justify-between h-full p-4">
//           <button onClick={toggleSidebar}>
//             {/* Close icon */}
//             <svg
//               className="w-6 h-6 fill-current text-gray-800 mb-4"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M6.7 6.7a.75.75 0 011.06 0L12 10.94l4.24-4.24a.75.75 0 111.06 1.06L13.06 12l4.24 4.24a.75.75 0 11-1.06 1.06L12 13.06l-4.24 4.24a.75.75 0 01-1.06-1.06L10.94 12 6.7 7.76a.75.75 0 010-1.06z"
//               />
//             </svg>
//           </button>
//           {/* Navigation links */}
//           <nav className="flex flex-col space-y-2">
//             <a href="/">Home</a>
//             <a href="/about">About</a>
//             <a href="/contact">Contact</a>
//           </nav>
//           {/* Logout button */}
//           <button className="mt-auto">Logout</button>
//         </div>
//       </div>
//     </div>
//   )}
// </header>