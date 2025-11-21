'use client'

import Image from 'next/image'
import { Star, Sparkles, Quote, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Review {
  name: string
  rating: number
  text: string
  image: string
}

interface ReviewCardProps {
  review: Review
}

// Translations for review-related text
const translations = {
  verified: {
    fr: "Achat Vérifié",
    ar: "شراء موثق"
  },
  helpful: {
    fr: "Utile",
    ar: "مفيد"
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { language } = useLanguage()

  // Helper function to get translated text
  const t = (key: keyof typeof translations) => {
    return translations[key][language]
  }

  // Generate random helpful count (for demo purposes)
  const helpfulCount = Math.floor(Math.random() * 50) + 10

  return (
    <div className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-12 h-12 text-cyan-400" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header with Avatar and Rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Name and Verified Badge */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors duration-300">
                {review.name}
              </h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-1 rounded-full">
                  {t('verified')}
                </span>
              </div>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400 group-hover:scale-110'
                      : 'fill-gray-600 text-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-400 font-semibold">
              {review.rating}.0/5.0
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div className="relative">
          <p className="text-gray-300 leading-relaxed text-lg font-light italic">
            "{review.text}"
          </p>
          
          {/* Text Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-transparent to-black/0 group-hover:to-black/20 transition-all duration-500" />
        </div>

        {/* Review Image */}
        {review.image && (
          <div className="relative group/image">
            <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-transparent bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-1">
              <div className="rounded-xl overflow-hidden bg-black">
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={`${review.name}'s review`}
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                />
              </div>
            </div>
            
            {/* Image Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <button className="p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
                <Heart className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                {language === 'fr' ? 'Agrandir' : 'تكبير'}
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300 group/like">
              <Heart className="w-4 h-4 group-hover/like:fill-pink-400 group-hover/like:text-pink-400 transition-all duration-300" />
              <span>{helpfulCount}</span>
            </button>
            <span className="text-gray-500">•</span>
            <span>{t('helpful')}</span>
          </div>

          {/* Time Stamp */}
          <div className="text-xs text-gray-500">
            {language === 'fr' ? 'Il y a 2 semaines' : 'قبل أسبوعين'}
          </div>
        </div>

        {/* Neon Glow Border on Hover */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-3 left-3 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
    </div>
  )
}