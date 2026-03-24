'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { API_URL, DEFAULT_HEADERS } from '@hyunwoo/shared/config'
import { motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactForm as TContactForm } from '@/shared/schemas'

export function ContactForm() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TContactForm>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = async (values: TContactForm) => {
    setResult(null)

    try {
      const body: Record<string, string> = {
        name: values.name,
        email: values.email,
        message: values.message,
      }
      if (values.subject) body.subject = values.subject

      const res = await fetch(`${API_URL}/api/portfolio/contact`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setResult({ success: true, message: 'Message sent successfully!' })
        reset()
      } else if (res.status === 429) {
        setResult({ success: false, message: 'Too many requests. Please try again later.' })
      } else {
        setResult({ success: false, message: 'Failed to send. Please try again.' })
      }
    } catch {
      setResult({ success: false, message: 'Something went wrong.' })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
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
            type="text"
            placeholder="Your name"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            {...register('name')}
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs text-muted-foreground mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs text-muted-foreground mb-2">
          Subject <span className="text-muted-foreground/50">(optional)</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What's this about?"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
          {...register('subject')}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Your message..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          {...register('message')}
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {result && (
        <p className={`text-xs text-center ${result.success ? 'text-green-400' : 'text-red-400'}`}>{result.message}</p>
      )}
    </motion.form>
  )
}
