import { createRoot } from 'react-dom/client'
import React from 'react'
import '@/index.css'
import App from '@/App'
import "@/styles/custom.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { queryClient } from '@/queryClient'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
)
