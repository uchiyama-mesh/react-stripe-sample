import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')

    if (!clientSecret) {
      return
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) return
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!')
            break
          case 'processing':
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setMessage('Something went wrong.')
            break
        }
      })
      .catch((err) => console.error(err))
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/checkout',
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      if (error.message) setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form id="payment-form" onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
      <PaymentElement id="payment-element" />
      <button type="submit" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
