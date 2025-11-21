'use client'

import { useState, useEffect } from 'react'
import { products } from '@/lib/products'
import { OrderForm } from '@/components/order-form'
import { ArrowLeft, Check, Star, Truck, Shield, Zap, Heart, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

// Translations
const translations = {
  back: {
    fr: "Retour aux Produits",
    ar: "العودة إلى المنتجات"
  },
  keyFeatures: {
    fr: "Caractéristiques Principales",
    ar: "الميزات الرئيسية"
  },
  placeOrder: {
    fr: "Passer Votre Commande",
    ar: "اطلب الآن"
  },
  reviews: {
    fr: "clients satisfaits",
    ar: "عميل راض"
  },
  delivery: {
    fr: "Livraison: Paiement à la livraison disponible",
    ar: "التوصيل: الدفع عند الاستلام متاح"
  },
  specifications: {
    fr: "Spécifications Techniques",
    ar: "المواصفات الفنية"
  },
  whyChoose: {
    fr: "Pourquoi Choisir Ce Produit",
    ar: "لماذا تختار هذا المنتج"
  },
  share: {
    fr: "Partager",
    ar: "مشاركة"
  }
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { language } = useLanguage()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  // Helper function to get translated text
  const t = (key: keyof typeof translations) => {
    return translations[key][language]
  }

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { id } = await params
        const foundProduct = products.find((p) => p.id === id)
        setProduct(foundProduct)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {language === 'fr' ? 'Produit non trouvé' : 'المنتج غير موجود'}
          </h1>
          <Link href="/products" className="text-cyan-400 hover:text-cyan-300">
            {t('back')}
          </Link>
        </div>
      </div>
    )
  }

  // Mock additional images for gallery
  const productImages = [
    product.image,
    product.image, // In a real app, you'd have multiple images
    product.image,
    product.image
  ]

  const specifications = [
    { label: language === 'fr' ? 'Tension' : 'الجهد', value: '12V DC' },
    { label: language === 'fr' ? 'Puissance' : 'الطاقة', value: '15W' },
    { label: language === 'fr' ? 'Durée de vie' : 'العمر الافتراضي', value: '50,000h' },
    { label: language === 'fr' ? 'Couleurs' : 'الألوان', value: language === 'fr' ? 'Multiples' : 'متعددة' },
    { label: language === 'fr' ? 'Installation' : 'التركيب', value: language === 'fr' ? 'Facile' : 'سهل' },
    { label: language === 'fr' ? 'Garantie' : 'الضمان', value: '2 ans' }
  ]

  const benefits = [
    {
      icon: Zap,
      title: language === 'fr' ? 'Économie d\'énergie' : 'توفير الطاقة',
      description: language === 'fr' ? 'Consommation minimale avec luminosité maximale' : 'استهلاك طاقة منخفض مع إضاءة قصوى'
    },
    {
      icon: Shield,
      title: language === 'fr' ? 'Haute qualité' : 'جودة عالية',
      description: language === 'fr' ? 'Matériaux premium et fabrication durable' : 'مواد فاخرة وتصنيع متين'
    },
    {
      icon: Truck,
      title: language === 'fr' ? 'Livraison rapide' : 'توصيل سريع',
      description: language === 'fr' ? 'Expédition sous 24-48 heures' : 'شحن خلال 24-48 ساعة'
    }
  ]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert(language === 'fr' ? 'Lien copié !' : 'تم نسخ الرابط!')
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-medium"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="group inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 mb-12 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">{t('back')}</span>
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-transparent bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-1">
                <div className="rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={productImages[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {/* Favorite Button */}
              <button className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl text-white hover:bg-pink-500/20 hover:border-pink-400/50 transition-all duration-300">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-cyan-400 bg-cyan-500/20'
                      : 'border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl text-cyan-400 text-sm font-semibold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-white font-semibold">4.9</span>
                  <span className="text-gray-400">({product.reviews})</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  {product.name}
                </span>
              </h1>

              <p className="text-4xl font-black text-cyan-400">
                {product.price} {language === 'fr' ? 'MAD' : 'درهم'}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-xl text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{t('keyFeatures')}</h3>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{t('specifications')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <div className="text-cyan-400 font-bold text-lg">{spec.value}</div>
                    <div className="text-gray-400 text-sm mt-1">{spec.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{t('placeOrder')}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Truck className="w-4 h-4" />
                  <span>{t('delivery')}</span>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
                <OrderForm product={product} />
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{t('whyChoose')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {language === 'fr' ? 'Produits Similaires' : 'منتجات مشابهة'}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group block p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold text-white mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <p className="text-cyan-400 font-black text-lg">{relatedProduct.price} MAD</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}