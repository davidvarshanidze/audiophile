import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CartProvider } from './components/store/CartContextProvider'
import './sass/index.scss'
import { Analytics } from "@vercel/analytics/react"

const stripeApiKey = import.meta.env.VITE_STRIPE_API_KEY;
const coinbaseApiKey = import.meta.env.VITE_COINBASE_API_KEY;
console.log(coinbaseApiKey);
console.log(stripeApiKey);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <Analytics />
      <App />
    </CartProvider>
  </React.StrictMode>
)