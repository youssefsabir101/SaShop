'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, switchLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { 
      label: language === 'fr' ? 'Accueil' : 'الرئيسية', 
      href: '/' 
    },
    { 
      label: language === 'fr' ? 'Produits' : 'المنتجات', 
      href: '/products' 
    },
    { 
      label: language === 'fr' ? 'À Propos' : 'من نحن', 
      href: '/about' 
    },
    { 
      label: language === 'fr' ? 'Contact' : 'اتصل بنا', 
      href: '/contact' 
    },
  ]

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'ar' : 'fr'
    switchLanguage(newLang)
  }

  return (
    <nav 
      dir="ltr"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-xl bg-black/90 border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10' 
            : 'backdrop-blur-md bg-gradient-to-b from-black/95 to-transparent'
      }`}
    >
      {/* Animated Neon Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative flex items-center space-x-3"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <span className="font-black text-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
             SaShop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group text-slate-200 hover:text-white font-medium transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="relative group px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {language === 'fr' ? 'FR' : 'AR'}
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-2 animate-slide-in-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-slate-200 hover:text-white hover:bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-transparent hover:border-cyan-400/30 transition-all duration-300 group"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="px-4 pt-4 border-t border-cyan-400/20">
              <button
                onClick={toggleLanguage}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {language === 'fr' ? 'Switch to العربية' : 'Passer au Français'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
