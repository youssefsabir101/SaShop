'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center pt-24">
      <div className="text-center space-y-6 max-w-md px-4">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
        <h1 className="text-4xl font-black text-slate-100">Something went wrong!</h1>
        <p className="text-slate-400">An unexpected error occurred. Please try again or contact support.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="px-6 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
