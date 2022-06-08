import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { CheckoutForm } from './CheckoutForm'
import './App.css'

const token = process.env.REACT_APP_STRIPE_PUBLIC_TOKEN!
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(token)

interface Data {
  clientSecret: string
}

export const CheckoutIndex: React.FC = () => {
  const [clientSecret, setClientSecret] = useState('')
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data: Data) => {
        console.log('set client secret')
        setClientSecret(data.clientSecret)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
