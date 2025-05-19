import RoutesElement from '@/routes'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@/redux/store';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RoutesElement/>
      </Provider>
    </BrowserRouter>
  )
}
