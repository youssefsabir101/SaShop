'use client'

import { useState } from 'react'
import { submitContactToGoogleForm } from '@/lib/google-forms'
import { Mail, Phone, MapPin, Loader2, CheckCircle, Send, MessageCircle, User } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

// Define proper TypeScript interfaces
interface TranslationText {
  fr: string;
  ar: string;
}

interface ContactInfo {
  title: TranslationText;
  value: string | TranslationText;
}

interface FormLabels {
  fullName: TranslationText;
  email: TranslationText;
  phone: TranslationText;
  subject: TranslationText;
  message: TranslationText;
}

interface FormPlaceholders {
  fullName: TranslationText;
  email: TranslationText;
  phone: TranslationText;
  subject: TranslationText;
  message: TranslationText;
}

interface FormSubmit {
  sending: TranslationText;
  send: TranslationText;
}

interface FormErrors {
  name: TranslationText;
  email: TranslationText;
  phone: TranslationText;
  message: TranslationText;
  generic: TranslationText;
}

interface Translations {
  heroSubtitle: TranslationText;
  contactInfo: {
    phone: ContactInfo;
    email: ContactInfo;
    location: ContactInfo;
  };
  form: {
    title: TranslationText;
    labels: FormLabels;
    placeholders: FormPlaceholders;
    submit: FormSubmit;
    success: TranslationText;
    errors: FormErrors;
  };
}

// Translations with proper typing
const translations: Translations = {
  heroSubtitle: {
    fr: "Prêt à illuminer votre espace ? Parlons de votre projet néon",
    ar: "مستعد لإضاءة مساحتك؟ لنتحدث عن مشروع النيون الخاص بك"
  },
  contactInfo: {
    phone: {
      title: { fr: "Téléphone", ar: "هاتف" },
      value: "+212 611036342"
    },
    email: {
      title: { fr: "Email", ar: "البريد الإلكتروني" },
      value: "contact@neonglow.com"
    },
    location: {
      title: { fr: "Localisation", ar: "الموقع" },
      value: { fr: "Casablanca, Maroc", ar: "الدار البيضاء، المغرب" }
    }
  },
  form: {
    title: {
      fr: "Envoyez-nous un Message",
      ar: "أرسل لنا رسالة"
    },
    labels: {
      fullName: { fr: "Nom Complet *", ar: "الاسم الكامل *" },
      email: { fr: "Email *", ar: "البريد الإلكتروني *" },
      phone: { fr: "Téléphone *", ar: "الهاتف *" },
      subject: { fr: "Sujet", ar: "الموضوع" },
      message: { fr: "Message *", ar: "الرسالة *" }
    },
    placeholders: {
      fullName: { fr: "Votre nom", ar: "اسمك" },
      email: { fr: "votre@email.com", ar: "بريدك@الإلكتروني.com" },
      phone: { fr: "+212 123 456", ar: "212 123 456+" },
      subject: { fr: "Comment pouvons-nous vous aider ?", ar: "كيف يمكننا مساعدتك؟" },
      message: { fr: "Votre message...", ar: "رسالتك..." }
    },
    submit: {
      sending: { fr: "Envoi en cours...", ar: "جاري الإرسال..." },
      send: { fr: "Envoyer le Message", ar: "إرسال الرسالة" }
    },
    success: {
      fr: "Message envoyé avec succès ! Nous vous répondrons bientôt.",
      ar: "تم إرسال الرسالة بنجاح! سنرد عليك قريبًا."
    },
    errors: {
      name: { fr: "Veuillez entrer votre nom", ar: "يرجى إدخال اسمك" },
      email: { fr: "Veuillez entrer votre email", ar: "يرجى إدخال بريدك الإلكتروني" },
      phone: { fr: "Veuillez entrer votre téléphone", ar: "يرجى إدخال هاتفك" },
      message: { fr: "Veuillez entrer votre message", ar: "يرجى إدخال رسالتك" },
      generic: { fr: "Échec de l'envoi du message", ar: "فشل في إرسال الرسالة" }
    }
  }
}

export default function ContactPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.fullName.trim()) throw new Error(translations.form.errors.name[language])
      if (!formData.email.trim()) throw new Error(translations.form.errors.email[language])
      if (!formData.phone.trim()) throw new Error(translations.form.errors.phone[language])
      if (!formData.message.trim()) throw new Error(translations.form.errors.message[language])

      await submitContactToGoogleForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
      })

      setIsSuccess(true)
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : translations.form.errors.generic[language])
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get translated text
  const t = (key: keyof Translations): string => {
    const translation = translations[key]
    if (typeof translation === 'object' && 'fr' in translation && 'ar' in translation) {
      return (translation as TranslationText)[language]
    }
    return (translation as any).fr // Fallback
  }

  const tContact = (key: keyof typeof translations.contactInfo): { title: string; value: string } => {
    const contact = translations.contactInfo[key]
    return {
      title: contact.title[language],
      value: typeof contact.value === 'string' ? contact.value : (contact.value as TranslationText)[language]
    }
  }

  // Fixed helper functions with proper typing
  const tFormLabel = (key: keyof FormLabels): string => {
    return translations.form.labels[key][language]
  }

  const tFormPlaceholder = (key: keyof FormPlaceholders): string => {
    return translations.form.placeholders[key][language]
  }

  const tFormSubmit = (key: keyof FormSubmit): string => {
    return translations.form.submit[key][language]
  }

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
          <p className="text-2xl sm:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Phone,
              key: 'phone' as keyof typeof translations.contactInfo,
              gradient: 'from-cyan-500 to-blue-500',
              link: 'tel:+212611036342'
            },
            {
              icon: Mail,
              key: 'email' as keyof typeof translations.contactInfo,
              gradient: 'from-purple-500 to-pink-500',
              link: 'mailto:contact@neonglow.com'
            },
            {
              icon: MapPin,
              key: 'location' as keyof typeof translations.contactInfo,
              gradient: 'from-pink-500 to-red-500',
              link: '#'
            }
          ].map((contact, index) => {
            const IconComponent = contact.icon
            const contactInfo = tContact(contact.key)
            
            return (
              <a
                key={index}
                href={contact.link}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{contactInfo.title}</h3>
                  <p className="text-gray-300 text-lg">{contactInfo.value}</p>
                </div>
              </a>
            )
          })}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                  {translations.form.title[language]}
                </h2>
                <p className="text-gray-400 text-lg">
                  {language === 'fr' 
                    ? "Remplissez le formulaire et nous vous répondrons dans les plus brefs délais"
                    : "املأ النموذج وسنرد عليك في أقرب وقت ممكن"
                  }
                </p>
              </div>

              {isSuccess && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-2xl flex items-center gap-3 animate-fade-in backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-green-400">{translations.form.success[language]}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-3">
                        {tFormLabel('fullName')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={tFormPlaceholder('fullName')}
                          className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-3">
                        {tFormLabel('email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={tFormPlaceholder('email')}
                          className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-3">
                        {tFormLabel('phone')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={tFormPlaceholder('phone')}
                          className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-white mb-3">
                        {tFormLabel('subject')}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={tFormPlaceholder('subject')}
                        className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-bold text-white mb-3">
                        {tFormLabel('message')}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={tFormPlaceholder('message')}
                        rows={8}
                        className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-900/20 border border-red-800 rounded-2xl text-red-400 text-sm backdrop-blur-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 text-white font-bold rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {tFormSubmit('sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        {tFormSubmit('send')}
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'fr' 
                ? "Heures d'Ouverture" 
                : "ساعات العمل"
              }
            </h3>
            <p className="text-gray-300 text-lg mb-2">
              {language === 'fr' 
                ? "Lundi - Vendredi: 9h00 - 18h00" 
                : "الإثنين - الجمعة: 9:00 - 18:00"
              }
            </p>
            <p className="text-gray-300 text-lg">
              {language === 'fr' 
                ? "Samedi - Dimanche: 10h00 - 16h00" 
                : "السبت - الأحد: 10:00 - 16:00"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}