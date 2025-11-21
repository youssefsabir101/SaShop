'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Sparkles, Heart, Zap } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useLanguage } from '@/context/LanguageContext'

interface ProductCardProps {
  product: Product
  layout?: 'vertical' | 'horizontal'
}

// Translations
const translations = {
  viewDetails: {
    fr: "Voir Détails",
    ar: "عرض التفاصيل"
  },
  inStock: {
    fr: "En Stock",
    ar: "متوفر"
  },
  addToCart: {
    fr: "Ajouter au Panier",
    ar: "أضف إلى السلة"
  }
}

export function ProductCard({ product, layout = 'vertical' }: ProductCardProps) {
  const { language } = useLanguage()

  // Helper function to get translated text
  const t = (key: keyof typeof translations) => {
    return translations[key][language]
  }

  if (layout === 'horizontal') {
    return (
      <Link href={`/products/${product.id}`}>
        <div className="group cursor-pointer">
          <div className="flex gap-6 p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
            {/* Image */}
            <div className="relative flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={128}
                height={128}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute top-2 right-2">
                <button className="p-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-pink-500/20 hover:border-pink-400/50 transition-all duration-300">
                  <Heart className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </div>
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl text-cyan-400 text-sm font-semibold whitespace-nowrap">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {product.price} {language === 'fr' ? 'MAD' : 'درهم'}
                  </span>
                </div>
                
                <button className="group/btn px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  {t('viewDetails')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default vertical layout
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group h-full cursor-pointer">
        <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm 
          border border-white/10 group-hover:border-cyan-400/50 transition-all duration-500 
          hover:scale-105 overflow-hidden">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col 
              justify-between p-3">

              {/* Top Info */}
              <div className="flex justify-between items-start">
                <span className="px-2 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl 
                  text-cyan-400 text-xs font-semibold">
                  {product.category}
                </span>

                <button className="p-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl 
                  text-white hover:bg-pink-500/20 hover:border-pink-400/50 transition-all duration-300">
                  <Heart className="w-3 h-3" />
                </button>
              </div>

              {/* CTA Button */}
              <button className="group/btn w-full flex items-center justify-center gap-2 px-4 py-2 
                bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl 
                hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25">
                <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                {t('viewDetails')}
              </button>
            </div>

            {/* Neon Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent 
              bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 
              group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-3">

            {/* Title & Stars */}
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">({product.reviews})</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Features Tags */}
            <div className="flex flex-wrap gap-1.5">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 border 
                    border-cyan-400/20 rounded-md text-cyan-400 text-[10px]"
                >
                  <Zap className="w-3 h-3" />
                  {feature.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
              {/* {product.features.length > 2 && (
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-400/20 rounded-md 
                  text-purple-400 text-[10px]">
                  +{product.features.length - 2}
                </span>
              )} */}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="space-y-0.5">
                <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 
                  bg-clip-text text-transparent">
                  {product.price} {language === 'fr' ? 'MAD' : 'درهم'}
                </span>

                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-semibold text-green-400">
                    {t('inStock')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                <span>🔥</span>
                <span className="font-semibold">Populaire</span>
              </div>
            </div>

          </div>

          {/* Glow Hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 
            to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
            pointer-events-none" />
        </div>
      </div>
    </Link>

  )
}