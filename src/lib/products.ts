export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  images: string[]
  features: string[]
  reviews: number
}

export const categories = ['all', 'signs', 'tubes', 'lamps', 'custom']

export const products: Product[] = [
  {
    id: '1',
    name: 'Neon Pink Love Sign',
    category: 'signs',
    price: 399, // converted price from EGP to MAD
    description: 'Beautiful glowing pink love sign perfect for bedrooms and romantic spaces',
    image: '/neon-pink-love-sign.png',
    images: ['/neon-pink-love-sign.png'],
    features: [
      'Premium neon glass',
      'Pink LED glow',
      'Easy wall mounting',
      'Low energy consumption',
      '2-year warranty'
    ],
    reviews: 128
  },
  {
    id: '2',
    name: 'Cyan Neon Room Light',
    category: 'tubes',
    price: 599, // converted price from EGP to MAD
    description: 'Vibrant cyan neon tube lighting for ambient room atmosphere',
    image: '/cyan-neon-room-light.png',
    images: ['/cyan-neon-room-light.png'],
    features: [
      'Full room brightness',
      'Cyan LED technology',
      'Adjustable brightness',
      'Remote control included',
      'Energy efficient'
    ],
    reviews: 95
  },
  {
    id: '3',
    name: 'Purple Star Neon Sign',
    category: 'signs',
    price: 329, // converted price from EGP to MAD
    description: 'Decorative star-shaped neon sign in stunning purple',
    image: '/neon-purple-star-sign.png',
    images: ['/neon-purple-star-sign.png'],
    features: [
      'Star-shaped design',
      'Purple glow effect',
      'Compact size',
      'Battery or USB powered',
      'Perfect for desks'
    ],
    reviews: 87
  },
  {
    id: '4',
    name: 'Rainbow Flex Tube Light',
    category: 'tubes',
    price: 259, // converted price from EGP to MAD
    description: 'Multi-color flexible neon tube for creative installations',
    image: '/neon-rainbow-flex-tube-light.png',
    images: ['/neon-rainbow-flex-tube-light.png'],
    features: [
      'Rainbow color options',
      'Flexible design',
      'DIY installation',
      'Multiple modes',
      'Waterproof rated'
    ],
    reviews: 156
  },
  {
    id: '5',
    name: 'Blue Fire Neon Text Sign',
    category: 'signs',
    price: 759, // converted price from EGP to MAD
    description: 'Custom text neon sign with intense blue fire effect',
    image: '/neon-blue-fire-text-sign.png',
    images: ['/neon-blue-fire-text-sign.png'],
    features: [
      'Customizable text',
      'Blue LED flames',
      'Professional quality',
      'Long lifespan',
      'Silent operation'
    ],
    reviews: 112
  },
  {
    id: '6',
    name: 'Pink Marble Lamp',
    category: 'lamps',
    price: 399, // converted price from EGP to MAD
    description: 'Elegant marble base lamp with soft pink neon glow',
    image: '/neon-pink-marble-lamp-decorative.png',
    images: ['/neon-pink-marble-lamp-decorative.png'],
    features: [
      'Marble base',
      'Pink LED tube',
      'Desk lamp height',
      'Touch control',
      'Modern design'
    ],
    reviews: 73
  }
]
