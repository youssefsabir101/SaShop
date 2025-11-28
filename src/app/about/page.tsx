'use client'

import { CheckCircle, Award, Zap, Sparkles, Users, Globe, Heart } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

// Translations
const translations = {
  heroTitle: {
    fr: "Notre Histoire Lumineuse",
    ar: "قصتنا المشرقة"
  },
  heroSubtitle: {
    fr: "Depuis 2020, nous illuminons les espaces avec la magie du néon artisanal",
    ar: "منذ 2020، ننير المساحات بسحر النيون الحرفي"
  },
  ourStory: {
    fr: "Notre Histoire",
    ar: "قصتنا"
  },
  storyContent: {
    p1: {
      fr: "SaShop est né d'une passion simple : rendre les décorations néon LED premium accessibles à tous. Ce qui a commencé comme un projet passion dans un petit atelier est devenu le leader marocain des néons artistiques.",
      ar: "ولدت SaShop من شغف بسيط: جعل ديكورات النيون الفاخرة في متناول الجميع. ما بدأ كمشروع شغف في ورشة صغيرة أصبح الرائد المغربي في الأنوار النيون الفنية."
    },
    p2: {
      fr: "Nous croyons que chaque espace mérite de briller. Qu'il s'agisse d'une chambre, d'un café, d'un bureau ou d'un studio créatif, nos décorations néon transforment les espaces ordinaires en expériences extraordinaires.",
      ar: "نؤمن أن كل مساحة تستحق أن تتألق. سواء كانت غرفة نوم، مقهى، مكتب أو استوديو إبداعي، ديكورات النيون لدينا تحول المساحات العادية إلى تجارب استثنائية."
    },
    p3: {
      fr: "Aujourd'hui, nous servons des milliers de clients satisfaits à travers le Maroc, fournissant des produits néon de haute qualité avec un service et un support exceptionnels.",
      ar: "اليوم، نخدم الآلاف من العملاء الراضين في جميع أنحاء المغرب، نقدم منتجات نيون عالية الجودة مع خدمة ودعم استثنائيين."
    }
  },
  ourValues: {
    fr: "Nos Valeurs",
    ar: "قيمنا"
  },
  values: {
    quality: {
      title: { fr: "Qualité Premium", ar: "جودة فائقة" },
      desc: { fr: "Chaque produit est soigneusement fabriqué avec des matériaux premium et testé pour sa durabilité", ar: "كل منتج يصنع بعناية من مواد فاخرة ويفحص لضمان المتانة" }
    },
    innovation: {
      title: { fr: "Innovation Créative", ar: "إبداع مبتكر" },
      desc: { fr: "Nous explorons constamment de nouveaux designs et technologies pour donner vie à des idées fraîches", ar: "نستكشف باستمرار تصاميم وتقنيات جديدة لإحياء الأفكار المبتكرة" }
    },
    satisfaction: {
      title: { fr: "Satisfaction Client", ar: "رضا العملاء" },
      desc: { fr: "Votre bonheur est notre priorité. Nous garantissons un service et un support exceptionnels", ar: "سعادتك هي أولويتنا. نضمن خدمة ودعم استثنائيين" }
    }
  },
  whyChooseUs: {
    fr: "Pourquoi Choisir SaShop ?",
    ar: "لماذا تختار SaShop ؟"
  },
  reasons: [
    { fr: "Produits néon de qualité premium", ar: "منتجات نيون بجودة فائقة" },
    { fr: "Livraison rapide et fiable", ar: "توصيل سريع وموثوق" },
    { fr: "Prix compétitifs", ar: "أسعار تنافسية" },
    { fr: "Support client professionnel", ar: "دعم عملاء محترف" },
    { fr: "Options de personnalisation disponibles", ar: "خيارات تخصيص متاحة" },
    { fr: "Service paiement à la livraison", ar: "خدمة الدفع عند الاستلام" }
  ],
  stats: {
    years: { fr: "Années d'Excellence", ar: "سنوات من التميز" },
    clients: { fr: "Clients Satisfaits", ar: "عميل راض" },
    products: { fr: "Créations Uniques", ar: "تصميم فريد" },
    delivery: { fr: "Villes Desservies", ar: "مدينة مُخَدَّمة" }
  }
}

export default function AboutPage() {
  const { language } = useLanguage()

  // Helper function to get translated text
  const t = (key: keyof typeof translations) => {
    const translation = translations[key]
    if (typeof translation === 'object' && 'fr' in translation && 'ar' in translation) {
      return translation[language]
    }
    return (translation as any).fr
  }

  const tStory = (key: keyof typeof translations.storyContent) => {
    return translations.storyContent[key][language]
  }

  const tValues = (key: keyof typeof translations.values, type: 'title' | 'desc') => {
    return translations.values[key][type][language]
  }

  const tStats = (key: keyof typeof translations.stats) => {
    return translations.stats[key][language]
  }

  return (
    <div className="min-h-screen bg-black pt-20 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Hero Section */}
        <div className="text-center mb-10 space-y-8">
          <div className="relative inline-block">
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
          </div>
          <p className="text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Award, number: '4+', label: tStats('years') },
            { icon: Users, number: '2K+', label: tStats('clients') },
            { icon: Sparkles, number: '100+', label: tStats('products') },
            { icon: Globe, number: '50+', label: tStats('delivery') }
          ].map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                <stat.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="space-y-8">
            <div className="relative">
              <h2 className="text-5xl sm:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {t('ourStory')}
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-6"></div>
            </div>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {tStory('p1')}
              </p>
              <p className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {tStory('p2')}
              </p>
              <p className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {tStory('p3')}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden border-2 border-transparent bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-1">
              <div className="rounded-2xl overflow-hidden bg-black">
                <Image
                  src="/neon-led-store-owner-working.png"
                  alt={language === 'fr' ? "Équipe NeonGlow au travail" : "فريق نيون جلو أثناء العمل"}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized={true}
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('ourValues')}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {language === 'fr' 
                ? "Les principes qui guident chaque création NeonGlow" 
                : "المبادئ التي توجه كل إبداع في نيون جلو"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                key: 'quality' as keyof typeof translations.values,
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: Zap,
                key: 'innovation' as keyof typeof translations.values,
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Heart,
                key: 'satisfaction' as keyof typeof translations.values,
                gradient: 'from-pink-500 to-red-500'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {tValues(value.key, 'title')}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {tValues(value.key, 'desc')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="relative bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('whyChooseUs')}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {translations.reasons.map((reason, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-300 text-lg group-hover:text-white transition-colors">
                    {reason[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">
              {language === 'fr' 
                ? "Prêt à Illuminer Votre Monde ?" 
                : "مستعد لإضاءة عالمك؟"
              }
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? "Rejoignez la communauté NeonGlow et transformez votre espace dès aujourd'hui"
                : "انضم إلى مجتمع نيون جلو وحول مساحتك اليوم"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                {language === 'fr' ? "Voir Nos Produits" : "شاهد منتجاتنا"}
              </button>
              <button className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-400 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all duration-500 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105">
                {language === 'fr' ? "Nous Contacter" : "اتصل بنا"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}