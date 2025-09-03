import { router } from './routes'
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { Suspense } from "react";

// Suspense hỗ trợ lazy loading
// Fallbackelement cho RouterProvider để hiển thị loading spinner trong khi đang tải
// Hydration fallback element cho RouterProvider để hiển thị loading spinner trong khi đang hydrate (SSR -> CLIENT)
export default function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider 
          router={router} 
          fallbackElement={<p>Loading...</p>}
          hydrateFallbackElement={<p>Hydrating...</p>}
        />
      </Suspense>
      <ToastContainer />
    </>
  )
}
