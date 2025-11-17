import { CheckCircle, Award, Zap } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'About SaShop - Premium Neon LED Decorations',
  description: 'Learn about SaShop and our mission to bring neon glow to every space.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-20 text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            About SaShop
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Bringing neon dreams to life since 2020. Premium LED decorations for creative spaces.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-100">Our Story</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                SaShop started with a simple idea: to make premium neon LED decorations accessible to everyone. What began as a passion project in a small workshop has grown into Egypt's leading neon LED provider.
              </p>
              <p>
                We believe that every space deserves to shine. Whether it's a bedroom, café, office, or creative studio, our neon decorations transform ordinary spaces into extraordinary experiences.
              </p>
              <p>
                Today, we serve thousands of happy customers across Egypt, providing high-quality neon products with exceptional service and support.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-slate-800">
            <Image
              src="/neon-led-store-owner-working.png"
              alt="SaShop team working"
              width={600}
              height={400}
              className="w-full h-96 object-cover"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality First',
                description: 'Every product is carefully crafted with premium materials and tested for durability.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'We constantly explore new designs and technologies to bring fresh ideas to life.'
              },
              {
                icon: CheckCircle,
                title: 'Customer Satisfaction',
                description: 'Your happiness is our priority. We guarantee exceptional service and support.'
              }
            ].map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="p-6 bg-slate-900 border border-slate-800 rounded-lg text-center hover:border-cyan-500/50 transition-all">
                  <IconComponent className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{value.title}</h3>
                  <p className="text-slate-400">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-slate-800 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Why Choose SaShop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Premium quality neon products',
              'Fast and reliable delivery',
              'Competitive pricing',
              'Professional customer support',
              'Customization options available',
              'Cash on delivery service'
            ].map((reason, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300 text-lg">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
