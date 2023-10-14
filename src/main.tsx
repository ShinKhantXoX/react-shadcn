import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/themeProvider.tsx"
import { RouterProvider } from 'react-router-dom'
import { routers } from './services/routers.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
          <RouterProvider router={routers} />
      </Provider>
    </ThemeProvider>,
)
