// src/app/contact/page.tsx
'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill all fields.')
      return
    }
    // Basic email regex
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email.')
      return
    }

    // MOCK: pretend to send message
    setTimeout(() => {
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    }, 700)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Contact Us</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
          <label className="block">
            <div className="text-sm font-medium">Name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Message</div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full p-2 border rounded" rows={5} />
          </label>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {sent && <div className="text-sm text-green-600">Message sent — we will contact you soon.</div>}

          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded">Send Message</button>
          </div>
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Other ways to reach us</h3>
          <p className="text-sm text-gray-600 mt-1">Phone: +92 300 1234567</p>
          <p className="text-sm text-gray-600">Email: hello@crave-corner.example</p>

          <div className="mt-4">
            <h4 className="font-medium">Location</h4>
            <div className="mt-2 w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
              {/* Replace with iframe/map embed later */}
              Map placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
