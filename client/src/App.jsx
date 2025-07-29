import {router} from './routes'
import { RouterProvider } from "react-router-dom";
export default function App() {
  return (
    <>
        <RouterProvider 
          router={router} 
          fallbackElement={<p>Loading...</p>}
          hydrateFallbackElement={<p>Đang đồng bộ cache...</p>}
        />
    </>
  )
}
