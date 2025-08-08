import {router} from './routes'
import { RouterProvider } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
export default function App() {
  return (
    <>
        <RouterProvider 
          router={router} 
          fallbackElement={<p>Loading...</p>}
        />
        <ToastContainer/>
    </>
  )
}
