'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Sparkles, Heart, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

// Translations
const translations = {
  brand: {
    name: {
      fr: "SaShop",
      ar: "SaShop"
    },
    tagline: {
      fr: "Illuminez votre espace avec la magie du néon artisanal",
      ar: "أضيء مساحتك بسحر النيون الحرفي"
    }
  },
  quickLinks: {
    title: {
      fr: "Liens Rapides",
      ar: "روابط سريعة"
    },
    home: { fr: "Accueil", ar: "الرئيسية" },
    products: { fr: "Produits", ar: "المنتجات" },
    about: { fr: "À Propos", ar: "من نحن" },
    contact: { fr: "Contact", ar: "اتصل بنا" }
  },
  customerService: {
    title: {
      fr: "Service Client",
      ar: "خدمة العملاء"
    },
    shipping: { fr: "Informations Livraison", ar: "معلومات الشحن" },
    returns: { fr: "Retours", ar: "الإرجاع" },
    faq: { fr: "FAQ", ar: "الأسئلة الشائعة" },
    terms: { fr: "Conditions", ar: "الشروط" }
  },
  contact: {
    title: {
      fr: "Contactez-Nous",
      ar: "اتصل بنا"
    },
    phone: {
      fr:"+212 611036342",
      ar:"+212611036342"
    },
    email:{
      fr:"cont@sashop.com",
      ar:"cont@sashop.com",
    }, 
    
    location: {
      fr: "Casablanca, Maroc",
      ar: "الدار البيضاء، المغرب"
    }
  },
  newsletter: {
    title: {
      fr: "Restez Connecté",
      ar: "ابق على اطلاع"
    },
    subtitle: {
      fr: "Recevez nos dernières créations et offres exclusives",
      ar: "احصل على أحدث إبداعاتنا وعروضنا الحصرية"
    },
    placeholder: {
      fr: "Votre email",
      ar: "بريدك الإلكتروني"
    },
    button: {
      fr: "S'abonner",
      ar: "اشتراك"
    }
  },
  copyright: {
    fr: "Tous droits réservés. Fabriqué avec amour et lueur néon ✨",
    ar: "جميع الحقوق محفوظة. صنع بحب ووهج النيون ✨"
  }
}

export function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  // Helper function to get translated text
  const t = (section: keyof typeof translations, key?: string) => {
    if (key) {
      return translations[section][key as keyof typeof translations[typeof section]][language]
    }
    return (translations[section] as any)[language]
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic would go here
    alert(language === 'fr' ? 'Merci pour votre inscription !' : 'شكراً لاشتراكك!')
  }

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-black to-purple-900/20 text-gray-300" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-cyan-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
                <span className="font-black text-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('brand', 'name')}
                </span>
              </Link>
              <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                {t('brand', 'tagline')}
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-lg mb-2">{t('newsletter', 'title')}</h4>
                <p className="text-gray-400 text-sm">{t('newsletter', 'subtitle')}</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <input
                  type="email"
                  placeholder={t('newsletter', 'placeholder')}
                  className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  {t('newsletter', 'button')}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-cyan-400 text-lg">{t('quickLinks', 'title')}</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: t('quickLinks', 'home') },
                { href: "/products", label: t('quickLinks', 'products') },
                { href: "/about", label: t('quickLinks', 'about') },
                { href: "/contact", label: t('quickLinks', 'contact') }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="font-bold text-purple-400 text-lg">{t('customerService', 'title')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('customerService', 'shipping') },
                { label: t('customerService', 'returns') },
                { label: t('customerService', 'faq') },
                { label: t('customerService', 'terms') }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-pink-400 text-lg">{t('contact', 'title')}</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${t('contact', 'phone')}`}
                  className="group flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                    <Phone className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>{t('contact', 'phone')}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${t('contact', 'email')}`}
                  className="group flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>{t('contact', 'email')}</span>
                </a>
              </li>
              <li>
                <div className="group flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-pink-400" />
                  </div>
                  <span>{t('contact', 'location')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Twitter, href: "#", color: "hover:text-cyan-400" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`group p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-current/30`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} {t('brand', 'name')}.</span>
              <span className="flex items-center gap-1">
                {t('copyright')}
                <Heart className="w-4 h-4 text-pink-400 fill-current" />
              </span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{language === 'fr' ? 'Paiement à la livraison' : 'الدفع عند الاستلام'}</span>
            </div>
          </div>
        </div>

        {/* Decorative Neon Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>
      </div>
    </footer>
  )
}