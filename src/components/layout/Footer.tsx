import Link from 'next/link'

interface FooterProps {
  phone: string
  whatsapp: string
  telegram: string
  avitoUrl: string
  vkUrl: string
  rutubeUrl: string
  tgChannelUrl: string
}

const SOCIAL_ICON_CLASS =
  'flex items-center justify-center w-9 h-9 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-110'

export function Footer({
  phone,
  whatsapp,
  telegram,
  avitoUrl,
  vkUrl,
  rutubeUrl,
  tgChannelUrl,
}: FooterProps) {
  const socials = [
    avitoUrl && { href: avitoUrl, label: 'Авито', abbr: 'Av', cls: 'bg-[#00AAFF] text-white' },
    vkUrl && { href: vkUrl, label: 'VK', abbr: 'VK', cls: 'bg-[#0077FF] text-white' },
    rutubeUrl && { href: rutubeUrl, label: 'Rutube', abbr: 'RT', cls: 'bg-[#1B1B1B] text-white border border-parchment/20' },
    tgChannelUrl && { href: tgChannelUrl, label: 'Telegram канал', abbr: 'TG', cls: 'bg-[#0088cc] text-white' },
  ].filter(Boolean) as { href: string; label: string; abbr: string; cls: string }[]

  return (
    <footer className="border-t border-gold/20 bg-dark-soft py-12 mt-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-bold text-parchment mb-3">
              Галерея <span className="text-gold">ЛИК</span>
            </div>
            <p className="text-parchment/60 text-sm leading-relaxed">
              Экспертная оценка, покупка и продажа предметов восточного искусства
            </p>

            {/* Social channel icons */}
            {socials.length > 0 && (
              <div className="flex gap-2 mt-4">
                {socials.map((s) => (
                  <a
                    key={s.abbr}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${SOCIAL_ICON_CLASS} ${s.cls}`}
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.abbr}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-parchment font-semibold mb-4 text-sm uppercase tracking-wider">Разделы</h3>
            <nav className="space-y-2">
              {[
                { href: '/catalog', label: 'Каталог' },
                { href: '/services', label: 'Услуги' },
                { href: '/about', label: 'О нас' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-parchment font-semibold mb-4 text-sm uppercase tracking-wider">Связаться</h3>
            <div className="space-y-2">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  {phone}
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  WhatsApp
                </a>
              )}
              {telegram && (
                <a
                  href={`https://t.me/${telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  Telegram
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-parchment/40 text-xs">
            © {new Date().getFullYear()} Галерея ЛИК. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
