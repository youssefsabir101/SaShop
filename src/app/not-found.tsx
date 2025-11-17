import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center pt-24">
      <div className="text-center space-y-6 max-w-md px-4">
        <AlertCircle className="w-16 h-16 text-cyan-400 mx-auto" />
        <h1 className="text-6xl font-black text-slate-100">404</h1>
        <h2 className="text-2xl font-bold text-slate-200">Page Not Found</h2>
        <p className="text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
