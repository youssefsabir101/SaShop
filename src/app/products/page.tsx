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

export default function ProductsPage() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'price' | 'newest'>('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Helper function to get translated text
  const t = (key: keyof typeof translations) => {
    const translation = translations[key]
    if (typeof translation === 'object' && 'fr' in translation && 'ar' in translation) {
      return translation[language]
    }
    return (translation as any).fr
  }

  const tCategory = (category: string) => {
    return translations.categories[category as keyof typeof translations.categories]?.[language] || 
           category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Filter and sort products - FIXED: Removed createdAt since it doesn't exist
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          // Since createdAt doesn't exist, use product ID or name for consistent ordering
          return a.id.localeCompare(b.id)
        default:
          return 0
      }
    })

  // Reset search when category changes
  useEffect(() => {
    setSearchQuery('')
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-black pt-20 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              PRODUCTS
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Controls Bar */}
        <div className="mb-12 space-y-6">
          {/* Search and Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder={t('search').placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm pr-10"
                >
                  <option value="default">{t('sort').default}</option>
                  <option value="name">{t('sort').name}</option>
                  <option value="price">{t('sort').price}</option>
                  <option value="newest">{t('sort').newest}</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Filter className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-black/50 border border-white/10 rounded-2xl p-1 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all duration-300 ${
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

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {['all', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-2xl shadow-cyan-500/30 scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {activeCategory === category && <Sparkles className="w-4 h-4" />}
                  {tCategory(category)}
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400">
            <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> {t('results').found}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {language === 'fr' ? 'Effacer la recherche' : 'مسح البحث'}
            </button>
          )}
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-700 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard 
                  product={product} 
                  layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'fr' ? 'Aucun produit trouvé' : 'لم يتم العثور على منتجات'}
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              {t('results').none}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearchQuery('')
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                {language === 'fr' ? 'Voir tous les produits' : 'عرض جميع المنتجات'}
              </button>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 border-2 border-cyan-400/50 text-cyan-400 rounded-2xl font-bold backdrop-blur-sm transition-all duration-500 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105"
              >
                {language === 'fr' ? 'Effacer les filtres' : 'مسح الفلاتر'}
              </button>
            </div>
          </div>
        )}

        {/* Featured Banner */}
        {filteredProducts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-400/20 rounded-3xl p-12 backdrop-blur-sm">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">
                {language === 'fr' 
                  ? "Vous ne trouvez pas votre bonheur ?" 
                  : "لم تجد ما تبحث عنه؟"
                }
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {language === 'fr'
                  ? "Nous créons des néons personnalisés selon vos envies. Contactez-nous pour discuter de votre projet !"
                  : "نصنع لوحات نيون مخصصة حسب رغباتك. اتصل بنا لمناقشة مشروعك!"
                }
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                {language === 'fr' ? "Créer un néon personnalisé" : "إنشاء نيون مخصص"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}