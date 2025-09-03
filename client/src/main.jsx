import '@/index.css'
import "@/styles/custom.css"
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from '@/queryClient'
import App from '@/App'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
)
