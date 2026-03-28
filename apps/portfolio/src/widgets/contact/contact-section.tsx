'use client'

import { motion } from 'framer-motion'
import { Github, Globe, Instagram, Linkedin, Mail } from 'lucide-react'
import type { SocialLink } from '@/entities/portfolio'
import { ContactForm } from './contact-form'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  email: Mail,
  blog: Globe,
  linkedin: Linkedin,
  instagram: Instagram,
  website: Globe,
}

interface ContactSectionProps {
  socialLinks: SocialLink[]
}

export function ContactSection({ socialLinks }: ContactSectionProps) {
  return (
    <section id="contact" className="pt-14 px-6 md:pt-32 md:px-12 lg:px-24 pb-0 text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white/65 mb-3">Contact</h2>
        <p className="text-muted-foreground text-base md:text-lg">Feel free to reach out</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center gap-4 flex-wrap"
      >
        {socialLinks.map(link => {
          const Icon = ICON_MAP[link.icon.toLowerCase()] ?? Globe
          const href = link.icon.toLowerCase() === 'email' ? `mailto:${link.href}` : link.href

          return (
            <a
              key={link.name}
              href={href}
              target={link.icon.toLowerCase() === 'email' ? undefined : '_blank'}
              rel={link.icon.toLowerCase() === 'email' ? undefined : 'noopener noreferrer'}
              aria-label={link.name}
              className="group flex items-center gap-3 px-4 py-3 md:px-6 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="hidden md:inline text-sm font-medium text-foreground">{link.name}</span>
            </a>
          )
        })}
      </motion.div>

      <ContactForm />
    </section>
  )
}
