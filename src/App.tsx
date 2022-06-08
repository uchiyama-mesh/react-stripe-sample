import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CheckoutIndex } from './pages/Checkout/Index'
import { Home } from './pages/Home'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutIndex />} />
    </Routes>
  </BrowserRouter>
)
