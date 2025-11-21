'use client'

import { useState, useEffect } from 'react'
import { products, categories } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Search, Filter, Grid, List, Sparkles, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

// Translations
const translations = {
  heroTitle: {
    fr: "Nos Créations Néon",
    ar: "إبداعات النيون الخاصة بنا"
  },
  heroSubtitle: {
    fr: "Découvrez notre collection exclusive de néons artistiques et transformez votre espace",
    ar: "اكتشف مجموعتنا الحصرية من لوحات النيون الفنية وحول مساحتك"
  },
  search: {
    placeholder: {
      fr: "Rechercher un produit...",
      ar: "ابحث عن منتج..."
    }
  },
  categories: {
    all: { fr: "Tous", ar: "الكل" },
    custom: { fr: "Personnalisé", ar: "مخصص" },
    home: { fr: "Maison", ar: "منزل" },
    business: { fr: "Commerce", ar: "تجاري" },
    love: { fr: "Amour", ar: "حب" },
    quotes: { fr: "Citations", ar: "اقتباسات" }
  },
  view: {
    grid: { fr: "Grille", ar: "شبكة" },
    list: { fr: "Liste", ar: "قائمة" }
  },
  results: {
    found: {
      fr: "produits trouvés",
      ar: "منتج موجود"
    },
    none: {
      fr: "Aucun produit trouvé dans cette catégorie",
      ar: "لم يتم العثور على منتجات في هذا التصنيف"
    }
  },
  sort: {
    default: { fr: "Trier par", ar: "ترتيب حسب" },
    name: { fr: "Nom", ar: "الاسم" },
    price: { fr: "Prix", ar: "السعر" },
    newest: { fr: "Plus récent", ar: "الأحدث" }
  }
}

// 🔥 FIXED TRANSLATION HELPER — Supports nested keys!
const t = (path: string, language: "fr" | "ar") => {
  const keys = path.split(".")
  let value: any = translations

  for (const key of keys) {
    value = value?.[key]
    if (!value) return path // fallback
  }

  return value[language] ?? value
}

export default function ProductsPage() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'price' | 'newest'>('default')

  const tCategory = (category: string) => {
    return translations.categories[category as keyof typeof translations.categories]?.[language] ||
      category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

  useEffect(() => {
    setSearchQuery('')
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-black pt-20 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Background FX */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              PRODUCTS
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("heroSubtitle", language)}
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 space-y-6">
          
          {/* Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            <div className="relative flex-1 max-w-2xl w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder={t("search.placeholder", language)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white pr-10"
                >
                  <option value="default">{t("sort.default", language)}</option>
                  <option value="name">{t("sort.name", language)}</option>
                  <option value="price">{t("sort.price", language)}</option>
                  <option value="newest">{t("sort.newest", language)}</option>
                </select>

                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              </div>

              {/* View */}
              <div className="flex bg-black/50 border border-white/10 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {['all', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group relative px-6 py-3 rounded-2xl font-semibold ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-xl'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {activeCategory === category && <Sparkles className="w-4 h-4" />}
                  {tCategory(category)}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400">
            <span className="text-cyan-400 font-bold">{filteredProducts.length}</span>{" "}
            {t("results.found", language)}
          </p>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Zap className="w-12 h-12 mx-auto text-cyan-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("results.none", language)}
            </h3>
          </div>
        )}

      </div>
    </div>
  )
}
