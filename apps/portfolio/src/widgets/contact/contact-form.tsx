'use client'

import { API_URL, DEFAULT_HEADERS } from '@hyunwoo/shared/config'
import { motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL: ContactFormData = { name: '', email: '', subject: '', message: '' }

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL)
  const [isPending, setIsPending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setResult(null)

    try {
      const body: Record<string, string> = {
        name: form.name,
        email: form.email,
        message: form.message,
      }
      if (form.subject) body.subject = form.subject

      const res = await fetch(`${API_URL}/api/portfolio/contact`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setResult({ success: true, message: 'Message sent successfully!' })
        setForm(INITIAL)
      } else if (res.status === 429) {
        setResult({ success: false, message: 'Too many requests. Please try again later.' })
      } else {
        setResult({ success: false, message: 'Failed to send. Please try again.' })
      }
    } catch {
      setResult({ success: false, message: 'Something went wrong.' })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-xl p-6 space-y-4 max-w-lg mx-auto mt-10"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs text-muted-foreground mb-2 block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs text-muted-foreground mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs text-muted-foreground mb-2">
          Subject <span className="text-muted-foreground/50">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={200}
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          value={form.message}
          onChange={handleChange}
          placeholder="Your message..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {result && (
        <p className={`text-xs text-center ${result.success ? 'text-green-400' : 'text-red-400'}`}>{result.message}</p>
      )}
    </motion.form>
  )
}
