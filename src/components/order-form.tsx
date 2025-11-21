'use client'

import { useState } from 'react'
import { submitOrderToGoogleForm } from '@/lib/google-forms'
import { Loader2, CheckCircle, ShoppingCart, Package, MapPin, User, Phone, Mail } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useLanguage } from '@/context/LanguageContext'

interface OrderFormProps {
  product: Product
}

// Translations
const translations = {
  form: {
    title: {
      fr: "Passer Votre Commande",
      ar: "اطلب الآن"
    },
    labels: {
      fullName: { fr: "Nom Complet *", ar: "الاسم الكامل *" },
      email: { fr: "Email (Optionnel)", ar: "البريد الإلكتروني (اختياري)" },
      phone: { fr: "Numéro de Téléphone *", ar: "رقم الهاتف *" },
      quantity: { fr: "Quantité *", ar: "الكمية *" },
      totalPrice: { fr: "Prix Total", ar: "السعر الإجمالي" },
      address: { fr: "Adresse de Livraison *", ar: "عنوان التوصيل *" }
    },
    placeholders: {
      fullName: { fr: "Votre nom complet", ar: "اسمك الكامل" },
      email: { fr: "votre@email.com", ar: "بريدك@الإلكتروني.com" },
      phone: { fr: "+212 123 456 7890", ar: "212 123 456 7890+" },
      address: { fr: "Entrez votre adresse complète de livraison", ar: "أدخل عنوان التوصيل الكامل" }
    },
    submit: {
      submitting: { fr: "Envoi en cours...", ar: "جاري الإرسال..." },
      placeOrder: { fr: "Passer la Commande", ar: "تأكيد الطلب" }
    },
    success: {
      title: { fr: "Commande Envoyée avec Succès!", ar: "تم إرسال الطلب بنجاح!" },
      message: { 
        fr: "Merci pour votre commande ! Nous avons reçu vos détails et vous contacterons bientôt pour confirmer votre commande.", 
        ar: "شكراً لطلبك! لقد استلمنا تفاصيلك وسنتصل بك قريباً لتأكيد طلبك." 
      }
    },
    footer: {
      fr: "Paiement à la Livraison • Nous vous contacterons pour confirmer votre commande",
      ar: "الدفع عند الاستلام • سنتصل بك لتأكيد طلبك"
    }
  },
  errors: {
    name: { fr: "Veuillez entrer votre nom complet", ar: "يرجى إدخال اسمك الكامل" },
    phone: { fr: "Veuillez entrer votre numéro de téléphone", ar: "يرجى إدخال رقم هاتفك" },
    address: { fr: "Veuillez entrer votre adresse de livraison", ar: "يرجى إدخال عنوان التوصيل" },
    generic: { fr: "Échec de l'envoi de la commande", ar: "فشل في إرسال الطلب" }
  }
}

export function OrderForm({ product }: OrderFormProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1,
    address: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (value > 0) {
      setFormData((prev) => ({
        ...prev,
        quantity: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        throw new Error(translations.errors.name[language])
      }
      if (!formData.phone.trim()) {
        throw new Error(translations.errors.phone[language])
      }
      if (!formData.address.trim()) {
        throw new Error(translations.errors.address[language])
      }

      // Submit to Google Form
      await submitOrderToGoogleForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        productName: product.name,
        quantity: formData.quantity.toString(),
        totalPrice: (product.price * formData.quantity).toString(),
        address: formData.address,
      })

      setIsSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        quantity: 1,
        address: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : translations.errors.generic[language])
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get translated text
  const t = (section: keyof typeof translations.form, key?: string) => {
    if (key) {
      return translations.form[section][key as keyof typeof translations.form[typeof section]][language]
    }
    return (translations.form[section] as any)[language]
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-3xl backdrop-blur-sm animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-green-400">{t('success', 'title')}</h3>
            <p className="text-gray-300 mt-2 leading-relaxed">
              {t('success', 'message')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-2xl border border-green-400/20">
          <Package className="w-5 h-5 text-green-400" />
          <span className="text-green-400 text-sm font-semibold">
            {language === 'fr' ? 'Votre commande est en cours de traitement' : 'طلبك قيد المعالجة'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white">{t('title')}</h3>
          <p className="text-gray-400 text-sm">
            {language === 'fr' ? 'Remplissez vos informations de livraison' : 'املأ معلومات التوصيل الخاصة بك'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-white mb-3">
              {t('labels', 'fullName')}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t('placeholders', 'fullName')}
                className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-white mb-3">
              {t('labels', 'phone')}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('placeholders', 'phone')}
                className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-white mb-3">
            {t('labels', 'email')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('placeholders', 'email')}
              className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-white mb-3">
              {t('labels', 'quantity')}
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleQuantityChange}
              className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-white mb-3">
              {t('labels', 'totalPrice')}
            </label>
            <div className="px-4 py-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl text-cyan-400 font-black text-xl text-center">
              {product.price * formData.quantity} {language === 'fr' ? 'MAD' : 'درهم'}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-bold text-white mb-3">
            {t('labels', 'address')}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-4 w-5 h-5 text-cyan-400" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t('placeholders', 'address')}
              rows={4}
              className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-2xl text-red-400 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 text-white font-black rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-3">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('submit', 'submitting')}
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('submit', 'placeOrder')}
              </>
            )}
          </span>
        </button>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          {t('footer')}
        </p>
      </form>
    </div>
  )
}