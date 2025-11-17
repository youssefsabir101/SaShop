'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group h-full cursor-pointer">
        <div className="relative h-64 sm:h-56 md:h-64 overflow-hidden rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500 transition-all duration-300">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-bold rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all">
              <ShoppingCart className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-bold text-lg text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-slate-400">({product.reviews})</span>
          </div>

          <p className="text-sm text-slate-400 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              {product.price} EGP
            </span>
            <span className="text-xs font-bold px-2 py-1 bg-slate-800 text-cyan-400 rounded">
              In Stock
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
