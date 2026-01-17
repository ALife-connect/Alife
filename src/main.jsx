import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import {Provider} from "react-redux";
import {store} from "./global/store"
import {persistor} from "./global/store";
import { PersistGate } from 'redux-persist/integration/react'
import LoadComponents from './components/componentsLoadScreen/LoadComponents.jsx'
import LoadingScreen from './components/Loadscreen/Loadscreen.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={<LoadComponents/>} persistor={persistor}>
    <Toaster richColors position="top-center"/>
    <LoadingScreen>
      <App />
    </LoadingScreen>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
