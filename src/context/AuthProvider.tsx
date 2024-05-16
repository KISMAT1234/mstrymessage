"use client"
import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
  children,
}: {children: React.ReactNode}) {  // This line exports a React component named AuthProvider. It takes a prop called children, which represents the content inside the component.
  return (
    <SessionProvider>
    {children}
    </SessionProvider>  // This line returns the SessionProvider component with children inside it. The SessionProvider component manages the authentication state and provides session information to your application.
  )
}