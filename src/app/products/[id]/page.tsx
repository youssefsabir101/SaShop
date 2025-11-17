'use client'

import { products } from '@/lib/products'
import { OrderForm } from '@/components/order-form'
import { ArrowLeft, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-slate-400">{product.category}</p>
            </div>

            <div>
              <p className="text-3xl font-black text-cyan-400 mb-4">
                {product.price} MAD
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Form */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Place Your Order</h2>
              <OrderForm product={product} />
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-lg text-sm text-slate-300">
              <p className="mb-2"><span className="text-cyan-400 font-bold">Reviews:</span> {product.reviews} happy customers</p>
              <p><span className="text-cyan-400 font-bold">Delivery:</span> Cash on delivery available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
