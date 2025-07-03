import RoutesElement from '@/routes'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@/redux/store';
import ScrollToTop from './components/ScrollToTop';
export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop/>
        <RoutesElement/>
      </Provider>
    </BrowserRouter>
  )
}
