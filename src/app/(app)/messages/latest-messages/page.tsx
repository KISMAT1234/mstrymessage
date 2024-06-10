'use client'
import React from 'react'
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

 const LatestMessages= () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="my-2 mx-2 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <div>
        
      </div>
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
      </Pagination>
      <div className="flex">
      <button onClick={toggleSidebar} className="p-2 m-4 bg-blue-500 text-white rounded md:hidden">
        Toggle Sidebar
      </button>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:shadow-none md:w-auto md:h-auto md:flex md:flex-row md:items-center`}
      >
         <button
          onClick={toggleSidebar}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded md:hidden"
        >
          &times;
        </button>
        <nav className="mt-10 md:mt-0 md:flex md:space-x-4">
          <ul className="md:flex md:space-x-4">
            <li className="p-4 md:p-0"><a href="#home" className="text-gray-700">Home</a></li>
            <li className="p-4 md:p-0"><a href="#about" className="text-gray-700">About</a></li>
            <li className="p-4 md:p-0"><a href="#blog" className="text-gray-700">Blog</a></li>
            <li className="p-4 md:p-0"><a href="#contact" className="text-gray-700">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="p-4 md:ml-64">
        <h1 className="text-2xl">Main Content</h1>
        <p>Your main content goes here.</p>
      </div>
    </div>

  </div>
  )
}

export default LatestMessages

