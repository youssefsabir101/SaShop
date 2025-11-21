'use client'

import { useState, useEffect, useRef } from 'react'
import { products, categories } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { ReviewCard } from '@/components/review-card' 
import { ArrowRight, Zap, Sparkles, Star, Palette, ShoppingBag, Rocket, Shield, Heart, Play, Pause, Quote, TrendingUp, Clock, Users, Award } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

// Reviews Data
interface Review {
  name: string;
  rating: number;
  text: string;
  image: string;
}

const reviews: Review[] = [
  {
    name: 'Emma Wilson',
    rating: 5,
    text: 'The neon signs completely transformed my studio! The quality is incredible and the glow is so vibrant.',
    image: '/whatsapp-review-screenshot-happy-customer.png',
  },
  {
    name: 'Alex Chen',
    rating: 5,
    text: 'Fast shipping and amazing customer service. The custom design turned out even better than I imagined!',
    image: '/whatsapp-review-screenshot-positive-feedback.png',
  },
  {
    name: 'Sophia Rodriguez',
    rating: 5,
    text: 'Absolutely stunning! My café looks like a different place at night. Customers love the atmosphere.',
    image: '/whatsapp-review-screenshot-satisfied-customer.png',
  },
]

// Define proper TypeScript interfaces for translations
interface TranslationText {
  fr: string;
  ar: string;
}

interface StatsTranslations {
  clients: TranslationText;
  designs: TranslationText;
  delivery: TranslationText;
  support: TranslationText;
}

interface FeaturesTranslations {
  energy: {
    title: TranslationText;
    desc: TranslationText;
  };
  design: {
    title: TranslationText;
    desc: TranslationText;
  };
  quality: {
    title: TranslationText;
    desc: TranslationText;
  };
}

interface ProcessTranslations {
  title: TranslationText;
  steps: {
    consult: TranslationText;
    design: TranslationText;
    create: TranslationText;
    deliver: TranslationText;
  };
}

interface TrendingTranslations {
  title: TranslationText;
  subtitle: TranslationText;
}

interface ShowcaseTranslations {
  title: TranslationText;
  subtitle: TranslationText;
}

interface TestimonialsTranslations {
  title: TranslationText;
  subtitle: TranslationText;
}

interface Translations {
  Title: TranslationText;
  heroTitle: TranslationText;
  heroSubtitle: TranslationText;
  exploreCollection: TranslationText;
  createCustomDesign: TranslationText;
  featuredProducts: TranslationText;
  featuredSubtitle: TranslationText;
  whyChooseUs: TranslationText;
  clientStories: TranslationText;
  readyToGlow: TranslationText;
  readySubtitle: TranslationText;
  startAdventure: TranslationText;
  viewCollection: TranslationText;
  stats: StatsTranslations;
  features: FeaturesTranslations;
  process: ProcessTranslations;
  trending: TrendingTranslations;
  showcase: ShowcaseTranslations;
  testimonials: TestimonialsTranslations;
}

// Enhanced translations with new sections
const translations: Translations = {
  Title: {
    fr: "NEON",
    ar: "نيون"
  },
  heroTitle: {
    fr: "Lumière Néon, Émotion Pure",
    ar: "ضوء النيون، مشاعر خالصة"
  },
  heroSubtitle: {
    fr: "Transformez vos espaces avec la magie du néon artisanal",
    ar: "حول مساحاتك بسحر النيون الحرفي"
  },
  exploreCollection: { 
    fr: "Découvrir la Magie", 
    ar: "اكتشف السحر" 
  },
  createCustomDesign: { 
    fr: "Créer Votre Rêve", 
    ar: "اصنع حلمك" 
  },
  featuredProducts: {
    fr: "Créations Éblouissantes",
    ar: "إبداعات مبهرة"
  },
  featuredSubtitle: {
    fr: "Découvrez nos créations les plus éblouissantes",
    ar: "اكتشف أبرز إبداعاتنا المبهرة"
  },
  whyChooseUs: {
    fr: "L'Art du Néon Réinventé",
    ar: "فن النيون بإبداع جديد"
  },
  clientStories: {
    fr: "Histoires de Transformation",
    ar: "قصص التحول"
  },
  readyToGlow: {
    fr: "Prêt à Briller?",
    ar: "مستعد للتألق؟"
  },
  readySubtitle: {
    fr: "Rejoignez la communauté des passionnés de néon et transformez votre espace dès aujourd'hui",
    ar: "انضم إلى مجتمع عشاق النيون وحول مساحتك اليوم"
  },
  startAdventure: {
    fr: "Commencer l'Aventure",
    ar: "ابدأ المغامرة"
  },
  viewCollection: {
    fr: "Voir Toute la Collection",
    ar: "عرض المجموعة كاملة"
  },
  stats: {
    clients: { fr: "Rêves Réalisés", ar: "أحلام تحققت" },
    designs: { fr: "Créations Uniques", ar: "تصاميم فريدة" },
    delivery: { fr: "Livraison Express", ar: "توصيل فوري" },
    support: { fr: "Support 24/7", ar: "دعم مستمر" }
  },
  features: {
    energy: {
      title: { fr: "Énergie Innovante", ar: "طاقة مبتكرة" },
      desc: { fr: "Technologie LED dernière génération pour une luminosité optimale et une consommation minimale", ar: "تقنية LED من الجيل الجديد لإضاءة مثالية واستهلاك طاقة منخفض" }
    },
    design: {
      title: { fr: "Design Sur Mesure", ar: "تصميم مخصص" },
      desc: { fr: "Chaque pièce est unique, créée selon vos envies et votre style personnel", ar: "كل قطعة فريدة، مصممة حسب رغباتك وأسلوبك الشخصي" }
    },
    quality: {
      title: { fr: "Qualité Artistique", ar: "جودة فنية" },
      desc: { fr: "Des artisans passionnés qui transforment le verre et la lumière en véritables œuvres d'art", ar: "حرفيون شغولون يحولون الزجاج والضوء إلى قطع فنية حقيقية" }
    }
  },
  process: {
    title: {
      fr: "Comment Ça Marche",
      ar: "كيف تعمل"
    },
    steps: {
      consult: {
        fr: "Consultation Gratuite",
        ar: "استشارة مجانية"
      },
      design: {
        fr: "Design Personnalisé",
        ar: "تصميم مخصص"
      },
      create: {
        fr: "Création Artisanale",
        ar: "إبداع حرفي"
      },
      deliver: {
        fr: "Livraison Rapide",
        ar: "توصيل سريع"
      }
    }
  },
  trending: {
    title: {
      fr: "Tendances du Moment",
      ar: "الاتجاهات الحالية"
    },
    subtitle: {
      fr: "Découvrez les designs les plus populaires",
      ar: "اكتشف التصاميم الأكثر شهرة"
    }
  },
  showcase: {
    title: {
      fr: "Galerie d'Inspiration",
      ar: "معرض الإلهام"
    },
    subtitle: {
      fr: "Voyez nos néons dans des espaces réels",
      ar: "شاهد أضواء النيون لدينا في مساحات حقيقية"
    }
  },
  testimonials: {
    title: {
      fr: "Ils Nous Font Confiance",
      ar: "يثقون بنا"
    },
    subtitle: {
      fr: "Rejoignez des centaines de clients satisfaits",
      ar: "انضم إلى المئات من العملاء الراضين"
    }
  }
}

export default function Home() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [isMounted, setIsMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sliderRef = useRef<NodeJS.Timeout | null>(null) // FIXED: Added initial value

  // Enhanced Showcase content with images and videos
  const showcaseContent = [
    {
      id: 1,
      type: 'image',
      src: '/products/converted_devilheart_purple.png',
      title: language === 'fr' ? 'Salon Moderne' : 'صالون عصري',
      category: 'home',
      description: language === 'fr' 
        ? 'Néon personnalisé transformant un salon contemporain'
        : 'نيون مخصص يحول صالون معاصر'
    },
    {
      id: 2,
      type: 'video',
      src: '/showcase/cafe-neon-display.mp4',
      title: language === 'fr' ? 'Café Branché' : 'مقهى عصري',
      category: 'business',
      description: language === 'fr'
        ? 'Ambiance chaleureuse créée par nos néons artisanaux'
        : 'أجواء دافئة صنعتها أنوار النيون الحرفية'
    },
    {
      id: 3,
      type: 'image',
      src: '/products/angelwings2_purple-min.png',
      title: language === 'fr' ? 'Studio Créatif' : 'استوديو إبداعي',
      category: 'custom',
      description: language === 'fr'
        ? 'Espace de travail inspirant avec éclairage néon'
        : 'مساحة عمل ملهمة مع إضاءة النيون'
    },
    {
      id: 4,
      type: 'video',
      src: '/products/angelwings2_purple-min.png',
      title: language === 'fr' ? 'Chambre Élégante' : 'غرفة نوم أنيقة',
      category: 'home',
      description: language === 'fr'
        ? 'Ambiance romantique avec néon doux et apaisant'
        : 'أجواء رومانسية مع نيون ناعم ومهدئ'
    }
  ]

  // Trending products (most popular)
  const trendingProducts = products.slice(0, 4)

useEffect(() => {
    setIsMounted(true)
    // Simple particle animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.3)' : 'rgba(192, 38, 211, 0.3)'
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Auto-slide for showcase
    if (isPlaying) {
      sliderRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % showcaseContent.length)
      }, 5000)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (sliderRef.current) clearInterval(sliderRef.current) // FIXED: Check for null
    }
  }, [isPlaying, showcaseContent.length])

  // Handle video play/pause when slide changes
  useEffect(() => {
    // Pause all videos when slide changes
    const videos = document.querySelectorAll('video')
    videos.forEach(video => {
      video.pause()
      video.currentTime = 0
    })

    // Play current video if it's a video slide
    const currentContent = showcaseContent[currentSlide]
    if (currentContent.type === 'video') {
      const videoElement = document.getElementById(`video-${currentContent.id}`) as HTMLVideoElement
      if (videoElement) {
        videoElement.play().catch(console.error)
      }
    }
  }, [currentSlide, showcaseContent])

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  // Helper function to get translated text with proper typing
  const t = <K extends keyof Translations>(key: K): string => {
    const translation = translations[key]
    if (typeof translation === 'object' && 'fr' in translation && 'ar' in translation) {
      return translation[language]
    }
    return (translation as any).fr
  }

  // Helper for nested objects like stats and features
  const tStats = <K extends keyof StatsTranslations>(key: K): string => {
    return translations.stats[key][language]
  }

  const tFeatures = <K extends keyof FeaturesTranslations>(feature: K, type: 'title' | 'desc'): string => {
    return translations.features[feature][type][language]
  }

  const tProcess = (step: keyof typeof translations.process.steps): string => {
    return translations.process.steps[step][language]
  }

  const toggleSlider = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // If starting playback, also play current video if it's a video
      const currentContent = showcaseContent[currentSlide]
      if (currentContent.type === 'video') {
        const videoElement = document.getElementById(`video-${currentContent.id}`) as HTMLVideoElement
        if (videoElement) {
          videoElement.play().catch(console.error)
        }
      }
    } else {
      // If pausing, pause current video
      const currentContent = showcaseContent[currentSlide]
      if (currentContent.type === 'video') {
        const videoElement = document.getElementById(`video-${currentContent.id}`) as HTMLVideoElement
        if (videoElement) {
          videoElement.pause()
        }
      }
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-40"
      />

      {/* Hero Section - Immersive Design */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Floating Neon Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Main Title with Neon Effect */}
          <div className="mb-8">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                {t('Title')}
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl text-white mt-4 font-light">
                {t('heroTitle')}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Link
              href="/products"
              className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                {t('exploreCollection')}
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
            </Link>

            <Link
              href="/custom"
              className="group px-12 py-4 border-2 border-cyan-400/50 text-cyan-400 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all duration-500 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105"
            >
              <span className="flex items-center gap-3">
                <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('createCustomDesign')}
              </span>
            </Link>
          </div>

          {/* Floating Elements */}
          <div className="absolute -bottom-20 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce" />
          <div className="absolute -top-10 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section - Glass Morphism */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, number: '2K+', labelKey: 'clients' as keyof StatsTranslations },
              { icon: Sparkles, number: '100+', labelKey: 'designs' as keyof StatsTranslations },
              { icon: Rocket, number: '24h', labelKey: 'delivery' as keyof StatsTranslations },
              { icon: Shield, number: '24/7', labelKey: 'support' as keyof StatsTranslations }
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium">{tStats(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-cyan-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {translations.process.title[language]}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, step: 'consult', color: 'from-cyan-500 to-blue-500' },
              { icon: Palette, step: 'design', color: 'from-purple-500 to-pink-500' },
              { icon: Sparkles, step: 'create', color: 'from-pink-500 to-red-500' },
              { icon: Rocket, step: 'deliver', color: 'from-green-500 to-emerald-500' }
            ].map((item, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-2">0{index + 1}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {tProcess(item.step as keyof typeof translations.process.steps)}
                </h3>
                <p className="text-gray-400 text-sm">
                  {language === 'fr' 
                    ? ['Discutons de votre projet', 'Créons votre design unique', 'Fabriquons avec passion', 'Livrons chez vous rapidement'][index]
                    : ['نناقش مشروعك', 'نصنع تصميمك الفريد', 'نصنع بشغف', 'نوصله إليك بسرعة'][index]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <h2 className="text-5xl sm:text-6xl font-black">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {translations.trending.title[language]}
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {translations.trending.subtitle[language]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-500 hover:scale-105"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Slider - Enhanced with Images & Videos */}
      <section className="relative py-32 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {translations.showcase.title[language]}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {translations.showcase.subtitle[language]}
            </p>
          </div>

          <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden group">
            {/* Slider Controls */}
            <div className="absolute top-6 right-6 z-20 flex gap-2">
              <button
                onClick={toggleSlider}
                className="p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => goToSlide((currentSlide - 1 + showcaseContent.length) % showcaseContent.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => goToSlide((currentSlide + 1) % showcaseContent.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {showcaseContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-cyan-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Slides */}
            <div className="relative h-full">
              {showcaseContent.map((content, index) => (
                <div
                  key={content.id}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  {content.type === 'image' ? (
                    // Image Slide
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                      <div 
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${content.src})` }}
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <div className="text-4xl lg:text-5xl font-black mb-4 drop-shadow-2xl">
                            {content.title}
                          </div>
                          <div className="text-cyan-300 font-semibold text-lg mb-2 drop-shadow-lg">
                            {content.category}
                          </div>
                          <p className="text-gray-200 text-lg max-w-md mx-auto drop-shadow-lg">
                            {content.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Video Slide
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                      <video
                        id={`video-${content.id}`}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={content.src} type="video/mp4" />
                        {language === 'fr' ? 'Votre navigateur ne supporte pas la vidéo' : 'متصفحك لا يدعم الفيديو'}
                      </video>
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <div className="text-4xl lg:text-5xl font-black mb-4 drop-shadow-2xl">
                            {content.title}
                          </div>
                          <div className="text-cyan-300 font-semibold text-lg mb-2 drop-shadow-lg">
                            {content.category}
                          </div>
                          <p className="text-gray-200 text-lg max-w-md mx-auto drop-shadow-lg">
                            {content.description}
                          </p>
                          <div className="mt-4 flex items-center justify-center gap-2 text-cyan-300">
                            <Play className="w-4 h-4" />
                            <span className="text-sm">
                              {language === 'fr' ? 'Vidéo en lecture' : 'فيديو قيد التشغيل'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-100 ease-linear"
                style={{ 
                  width: isPlaying ? `${((currentSlide + 1) / showcaseContent.length) * 100}%` : '0%'
                }}
              />
            </div>
          </div>

          {/* Showcase Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: '50+', label: language === 'fr' ? 'Projets Réalisés' : 'مشروع منفذ' },
              { number: '98%', label: language === 'fr' ? 'Clients Satisfaits' : 'عميل راض' },
              { number: '24h', label: language === 'fr' ? 'Support Rapide' : 'دعم سريع' },
              { number: '2ans', label: language === 'fr' ? 'Garantie' : 'ضمان' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl font-black text-cyan-400 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Asymmetric Layout */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t('featuredProducts')}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('featuredSubtitle')}
            </p>
          </div>

          {/* Category Filters - Modern Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['all', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid - Creative Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 6).map((product, index) => (
              <div
                key={product.id}
                className={`transform transition-all duration-700 hover:scale-105 ${
                  index % 3 === 0 ? 'lg:-rotate-1 hover:rotate-0' : 
                  index % 3 === 1 ? 'lg:rotate-1 hover:rotate-0' : 
                  'lg:-rotate-1 hover:rotate-0'
                }`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              {t('viewCollection')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Interactive Cards */}
      <section className="relative py-32 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {t('whyChooseUs')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                featureKey: 'energy' as keyof FeaturesTranslations,
              },
              {
                icon: Star,
                featureKey: 'design' as keyof FeaturesTranslations,
              },
              {
                icon: Sparkles,
                featureKey: 'quality' as keyof FeaturesTranslations,
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {tFeatures(feature.featureKey, 'title')}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {tFeatures(feature.featureKey, 'desc')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Testimonials */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Quote className="w-8 h-8 text-purple-400" />
              <h2 className="text-5xl sm:text-6xl font-black">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('clientStories')}
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-400">
              {language === 'fr' 
                ? "Découvrez les expériences de nos clients satisfaits"
                : "اكتشف تجارب عملائنا الراضين"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:scale-105"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="relative py-32 bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-black mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('readyToGlow')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {t('readySubtitle')}
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-xl text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            {t('startAdventure')}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}