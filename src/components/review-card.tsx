import Image from 'next/image'
import { Star } from 'lucide-react'

interface Review {
  name: string
  rating: number
  text: string
  image: string
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-100">{review.name}</h3>
          <div className="flex gap-1 mt-1">
            {Array(review.rating).fill(0).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed mb-4">{review.text}</p>

      {review.image && (
        <div className="relative h-32 rounded-lg overflow-hidden border border-slate-800">
          <Image
            src={review.image || "/placeholder.svg"}
            alt={`${review.name}'s review`}
            fill
            unoptimized={true}
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}
