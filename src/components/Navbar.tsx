"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'
import { Facebook } from 'lucide-react';
import { Input } from "@/components/ui/input"

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
    const {data: session} = useSession()
    // console.log(data,'d')
    // console.log(session,'session in navbar')

    const user: User = session?.user as User
    console.log(user,'user in navbar')

  return (
    // <div>Navbar</div>
    <nav className="p-2 md:p-3 shadow-md bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
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

            <Input type="email" placeholder="Email" />
        
            <div className="">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                  </SheetHeader>
                   <a href="#" className="text-xl font-bold mb-4 md:mb-0">Mystry message</a>
                  <div className="flex ">
                    <Facebook className="w-full  md:w-auto bg-slate-100 text-black rounded"/> 
                    <Button onClick={()=> signOut()}  className="w-full md:w-auto bg-slate-100 text-black">Logout</Button>
                  </div>
                  {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                  </div> */}
                  {/* <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter> */}
                </SheetContent>
              </Sheet>
            </div>
        </div>
    </nav>

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















