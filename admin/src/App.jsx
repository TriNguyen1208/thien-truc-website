import RoutesElement from '@/routes'
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from '@/layouts/LayoutContext';
import { NavigationGuardProvider } from './layouts/NavigatorProvider';
export default function App() {
  return (
    <NavigationGuardProvider>
      <BrowserRouter>
        <LayoutProvider>
            <RoutesElement/>
        </LayoutProvider>
      </BrowserRouter>
    </NavigationGuardProvider>
  )
}
  