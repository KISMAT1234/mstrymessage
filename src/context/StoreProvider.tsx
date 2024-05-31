"use client"

import { store } from "@/store/store"
import React,{ReactNode} from "react"
import { Provider } from "react-redux"

interface StoreProviderProps {  //The interface specifies that the StoreProvider component will receive a single prop called children, which can be any valid React node (e.g., elements, components, strings, etc.).
    children: React.ReactNode;
  }
  export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {  //It automatically includes children in the component's props type and provides type checking and autocomplete support for functional components.
    return <Provider store={store}>{children}</Provider>;
  };

