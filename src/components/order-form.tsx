'use client'

import { useState } from 'react'
import { submitOrderToGoogleForm } from '@/lib/google-forms'
import { Loader2, CheckCircle } from 'lucide-react'
import type { Product } from '@/lib/products'

interface OrderFormProps {
  product: Product
}

export function OrderForm({ product }: OrderFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1,
    address: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (value > 0) {
      setFormData((prev) => ({
        ...prev,
        quantity: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        throw new Error('Please enter your full name')
      }
      if (!formData.phone.trim()) {
        throw new Error('Please enter your phone number')
      }
      if (!formData.address.trim()) {
        throw new Error('Please enter your address')
      }

      // Submit to Google Form
      await submitOrderToGoogleForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        productName: product.name,
        quantity: formData.quantity.toString(),
        totalPrice: (product.price * formData.quantity).toString(),
        address: formData.address,
      })

      setIsSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        quantity: 1,
        address: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit order')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-4 p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800 rounded-lg animate-fade-in">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="font-bold text-green-400">Order Submitted Successfully!</h3>
        </div>
        <p className="text-slate-200">
          Thank you for your order! We've received your details and will contact you soon to confirm your order.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-slate-200 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-200 mb-2">
          Email (Optional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-200 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+212 123 456 7890"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-200 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleQuantityChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-200 mb-2">
            Total Price
          </label>
          <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-cyan-400 font-bold">
            {product.price * formData.quantity} MAD
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-200 mb-2">
          Delivery Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your full delivery address"
          rows={3}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Place Order'
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Cash on Delivery • We'll contact you to confirm your order
      </p>
    </form>
  )
}
