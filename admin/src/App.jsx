// import RoutesElement from '@/routes'
import { LayoutProvider } from '@/layouts/LayoutContext';
import {useDispatch} from 'react-redux'
import { verifyFromToken } from './services/auth.api';
import { useEffect } from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ToastContainer } from 'react-toastify';
import { router } from '@/routes/router';
import { RouterProvider } from 'react-router-dom';
import Loading from '@/components/Loading';
const queryClient = new QueryClient();
import { NavigationGuardProvider } from './layouts/NavigatorProvider';
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyFromToken());
  }, [])

  return (
    <NavigationGuardProvider>
        <QueryClientProvider client={queryClient}>
            <LayoutProvider>
              <RouterProvider router={router}
              fallbackElement={<Loading/>}/>
                <ToastContainer/>
            </LayoutProvider>
        </QueryClientProvider>
    </NavigationGuardProvider>
  )
}
  
