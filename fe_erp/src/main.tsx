import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import { IndexRoutes } from './routes/Index.routes';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './store';
import './assets/styles/global.scss'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
   <CookiesProvider>
      <Provider store={store}>
        <IndexRoutes />
      </Provider>
    </CookiesProvider>

  </React.StrictMode>
);