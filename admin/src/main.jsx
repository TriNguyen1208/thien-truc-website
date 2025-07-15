import { createRoot } from 'react-dom/client'
import React from 'react'
import '@/index.css'
import App from '@/App'
import "@/styles/custom.css"
import store from './store'
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)
