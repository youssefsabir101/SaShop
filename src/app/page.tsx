'use client'

import { useState, useEffect } from 'react'
import { products, categories } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { ReviewCard } from '@/components/review-card'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

const reviews = [
  {
    name: 'Ahmed Hassan',
    rating: 5,
    text: 'Best neon signs ever! The quality is amazing and delivery was fast.',
    image: '/whatsapp-review-screenshot-happy-customer.png',
  },
  {
    name: 'Fatima Mohamed',
    rating: 5,
    text: 'Absolutely beautiful! My room looks so cool now. Highly recommend SaShop!',
    image: '/whatsapp-review-screenshot-satisfied-customer.png',
  },
  {
    name: 'Karim Ali',
    rating: 5,
    text: 'Perfect for my café. The glow is incredible and customers love it.',
    image: '/whatsapp-review-screenshot-positive-feedback.png',
  },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-glow-pulse mb-4">
              NEON DREAMS
            </h1>
            <p className="text-xl sm:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Illuminate your space with premium neon LED decorations. Transform any room into a vibrant neon paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg shadow-cyan-500/50">
                <Zap className="w-5 h-5" />
                Shop Now
              </Link>
              <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg text-lg hover:bg-cyan-400/10 transition-colors">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-16 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 glow-text-cyan">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-base ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 shadow-lg shadow-cyan-500/50 scale-105'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 glow-text-pink">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 glow-text-purple">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Your Space?</h2>
          <p className="text-xl text-slate-300">
            Join hundreds of happy customers who've elevated their spaces with SaShop neon LED decorations.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg shadow-pink-500/50">
            Explore All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
