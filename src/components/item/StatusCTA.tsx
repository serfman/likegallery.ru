import type { Item } from '@/types/sanity'

interface StatusCTAProps {
  item: Pick<Item, 'title' | 'category' | 'status' | 'price'>
  slug: string
}

export function StatusCTA({ item, slug }: StatusCTAProps) {
  const { title, category, status, price } = item

  const siteUrl = 'https://likegallery.ru'
  const itemUrl = `${siteUrl}/catalog/${slug}`

  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''
  const phone = process.env.NEXT_PUBLIC_PHONE ?? ''
  const max = process.env.NEXT_PUBLIC_MAX ?? ''

  if (status === 'sold') {
    const soldMsg = encodeURIComponent(
      `Мне интересно узнать больше про предмет «${title}» (${category}). Вот ссылка: ${itemUrl}\n\nУ меня есть подобный предмет, хочу продать. Можете оценить?`
    )
    return (
      <div className="bg-dark-soft border border-gold/20 rounded-xl p-6 space-y-4">
        <div className="border border-gold/40 rounded-lg px-4 py-2 inline-block">
          <span className="font-serif text-gold font-bold tracking-widest">ПРОДАНО</span>
        </div>
        <p className="font-serif text-parchment text-xl leading-snug">
          Владеете подобным предметом?
        </p>
        <p className="text-parchment/60 text-sm leading-relaxed">
          Мы купим его дорого. Отправьте фото — эксперт оценит бесплатно и быстро.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            {false && (
              <a
                href={`https://t.me/${telegram}?text=${soldMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0088cc] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity min-w-[140px]"
              >
                <span className="text-xs font-bold opacity-80">TG</span>
                Telegram
              </a>
            )}
            {max && (
              <a
                href={`${max}${max.includes('?') ? '&' : '?'}text=${soldMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-[#FF4500] font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors border border-black/5 min-w-[140px]"
              >
                <span className="text-xs font-bold opacity-80">MAX</span>
                Max
              </a>
            )}
          </div>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 border border-gold/30 text-parchment font-semibold px-5 py-3 rounded-xl hover:bg-gold/10 transition-colors w-full"
            >
              📞 {phone}
            </a>
          )}
        </div>
      </div>
    )
  }

  if (status === 'restoration') {
    return (
      <div className="bg-dark-soft border border-amber-700/30 rounded-xl p-6 space-y-4">
        <span className="inline-block bg-amber-700/20 text-amber-400 text-xs font-medium px-3 py-1 rounded-full border border-amber-700/40">
          На реставрации
        </span>
        <p className="text-parchment/60 text-sm leading-relaxed">
          Предмет временно находится на реставрации. Свяжитесь с нами, чтобы узнать сроки.
        </p>
        <div className="flex flex-col gap-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 bg-gold text-dark font-semibold px-5 py-3 rounded-xl hover:bg-gold/80 transition-colors w-full"
            >
              📞 Позвонить
            </a>
          )}
        </div>
      </div>
    )
  }

  // active
  const buyMsg = encodeURIComponent(
    `Мне интересно узнать больше про предмет «${title}» (${category}). Вот ссылка: ${itemUrl}`
  )
  return (
    <div className="bg-dark-soft border border-gold/20 rounded-xl p-6 space-y-4">
      {price && (
        <div>
          <p className="text-parchment/50 text-xs uppercase tracking-wider mb-1">Цена</p>
          <p className="text-gold text-2xl font-semibold font-serif">{price}</p>
        </div>
      )}
      <p className="text-parchment/60 text-sm leading-relaxed">
        Задайте вопрос или обсудите покупку — ответим быстро
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
            {false && (
            <a
              href={`https://t.me/${telegram}?text=${buyMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0088cc] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity min-w-[140px]"
            >
              <span className="text-xs font-bold opacity-80">TG</span>
              Написать в TG
            </a>
            )}
          {max && (
            <a
              href={`${max}${max.includes('?') ? '&' : '?'}text=${buyMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[#FF4500] font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors border border-black/5 min-w-[140px]"
            >
              <span className="text-xs font-bold opacity-80">MAX</span>
              Max
            </a>
          )}
        </div>
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-2 border border-gold/30 text-parchment font-semibold px-5 py-3 rounded-xl hover:bg-gold/10 transition-colors w-full"
          >
            📞 {phone}
          </a>
        )}
      </div>
    </div>
  )
}
