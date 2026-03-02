import { Icons } from '@/components/ui/Icons'

interface ContactLinkProps {
  type: 'whatsapp' | 'telegram' | 'max' | 'avito' | 'vk' | 'rutube' | 'phone' | 'email'
  value: string
  message?: string
  label: string
  fullWidth?: boolean
  className?: string
}

const PREMIER_STYLE = 'bg-dark/60 text-parchment border border-gold/20 hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm'

const STYLES: Record<ContactLinkProps['type'], string> = {
  whatsapp: PREMIER_STYLE,
  telegram: PREMIER_STYLE,

  max: PREMIER_STYLE,
  avito: PREMIER_STYLE,
  vk: PREMIER_STYLE,
  rutube: PREMIER_STYLE,
  phone: PREMIER_STYLE,
  email: PREMIER_STYLE,
}

function buildHref(type: ContactLinkProps['type'], value: string, message?: string): string {
  const encoded = message ? encodeURIComponent(message) : ''
  switch (type) {
    case 'whatsapp':
      return `https://wa.me/${value}${encoded ? `?text=${encoded}` : ''}`
    case 'telegram':
      return `https://t.me/${value}${encoded ? `?text=${encoded}` : ''}`

    case 'max':
      return `https://max.ru/${value}`
    case 'avito':
    case 'vk':
    case 'rutube':
      return value
    case 'phone':
      return `tel:${value}`
    case 'email':
      return `mailto:${value}`
  }
}

export function ContactLink({ type, value, message, label, fullWidth, className }: ContactLinkProps) {
  if (!value) return null

  const href = buildHref(type, value, message)
  const isExternal = type !== 'phone' && type !== 'email'

  const IconComponent = Icons[type]

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`
        ${STYLES[type]}
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2
        px-4 py-2.5 rounded-xl font-semibold text-sm
        shadow-md active:scale-95
        transition-all duration-150
        ${className ?? ''}
      `}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      {label}
    </a>
  )
}
