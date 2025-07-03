import RoutesElement from '@/routes'
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
export default function App() {
  return (
    <BrowserRouter>
        <ScrollToTop/>
        <RoutesElement/>
    </BrowserRouter>
  )
}
