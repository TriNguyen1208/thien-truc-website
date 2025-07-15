import RoutesElement from '@/routes'
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from '@/layouts/LayoutContext';
import {useDispatch} from 'react-redux'
import { verifyFromToken } from './services/auth.api';
import { useEffect } from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
import { NavigationGuardProvider } from './layouts/NavigatorProvider';
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyFromToken());
  }, [])

  return (
    <NavigationGuardProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <LayoutProvider>
                <RoutesElement />
                <ToastContainer/>
            </LayoutProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </NavigationGuardProvider>
  )
}
  