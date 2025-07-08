import RoutesElement from '@/routes'
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from '@/layouts/LayoutContext';
export default function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
          <RoutesElement/>
      </LayoutProvider>
    </BrowserRouter>
  )
}
  