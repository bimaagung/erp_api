import React from 'react'
import ReactDOM from 'react-dom/client'
import  IndexRoutes  from './routes/Index.Routes'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import store from '../src/store'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <div className='wrapper'>

        <IndexRoutes />
        </div>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
)