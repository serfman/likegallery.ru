import { client } from '@/lib/sanity/client'
import { FEATURED_SOLD_QUERY } from '@/lib/sanity/queries'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedItems } from '@/components/home/FeaturedItems'
import { MandalaDecoration } from '@/components/home/MandalaDecoration'
import type { Item } from '@/types/sanity'

export const revalidate = 3600

export default async function HomePage() {
  let featuredItems: Item[] = []

  try {
    featuredItems = await client.fetch<Item[]>(
      FEATURED_SOLD_QUERY,
      {},
      { cache: 'no-store' }
    )
  } catch {
    // Render without data if Sanity is not configured yet
  }

  return (
    <>
      <HeroSection />
      <FeaturedItems items={featuredItems} />

      {/* Inbound sourcing CTA section */}
      <section className="relative py-20 bg-dark-soft overflow-hidden">

        {/* Mandala left decorative accent */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <MandalaDecoration
            size={380}
            opacity={0.07}
            className="mandala-pulse"
          />
        </div>

        {/* Mandala right decorative accent */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <MandalaDecoration
            size={380}
            opacity={0.07}
            className="mandala-pulse"
          />
        </div>

        {/* Subtle gold radial glow behind content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 section-container text-center max-w-3xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">
            Продать предмет
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-parchment mb-6">
            Хотите продать предмет искусства?
          </h2>
          <p className="text-parchment/70 text-lg mb-10 leading-relaxed">
            Просто отправьте нам фотографию. Мы проведём бесплатную экспертную оценку
            и предложим справедливую цену. Работаем конфиденциально.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', title: 'Отправьте фото', desc: 'Сфотографируйте предмет и отправьте нам в мессенджер' },
              { step: '02', title: 'Получите оценку', desc: 'Эксперт галереи оценит предмет бесплатно' },
              { step: '03', title: 'Получите деньги', desc: 'Договоримся о цене и проведём сделку удобным способом' },
            ].map((item) => (
              <div key={item.step} className="bg-dark/50 rounded-xl p-6 border border-gold/10">
                <div className="text-gold font-serif text-3xl font-bold mb-3 opacity-60">{item.step}</div>
                <h3 className="font-serif text-parchment text-lg mb-2">{item.title}</h3>
                <p className="text-parchment/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div id="contact" className="space-y-8">
            <p className="text-parchment/70 text-sm">Выберите удобный способ связи:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
              {/* Связаться */}
              <div className="bg-dark/40 rounded-xl p-6 border border-gold/10 relative overflow-hidden group">
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <h3 className="font-serif text-gold text-lg mb-4 text-center sm:text-left relative z-10">Написать в мессенджер</h3>
                <div className="flex flex-col gap-3 relative z-10">
                  <a
                    href="https://t.me/79911588833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-dark/60 text-parchment border border-gold/20 px-4 py-3 rounded-xl hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all shadow-md active:scale-95"
                  >
                    <span className="font-bold text-sm text-gold">TG</span>
                    <span className="text-sm font-medium tracking-wide">+7 991 158-88-33</span>
                  </a>

                  <a
                    href={process.env.NEXT_PUBLIC_MAX || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-dark/60 text-parchment border border-gold/20 px-4 py-3 rounded-xl hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all shadow-md active:scale-95"
                  >
                    <span className="font-bold text-sm text-[#FF4500]">MAX</span>
                    <span className="text-sm font-medium tracking-wide">Написать в MAX</span>
                  </a>
                </div>
              </div>

              {/* Наши каналы */}
              <div className="bg-dark/40 rounded-xl p-6 border border-gold/10 relative overflow-hidden group">
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <h3 className="font-serif text-gold text-lg mb-4 text-center sm:text-left relative z-10">Наши каналы</h3>
                <div className="flex flex-col gap-3 relative z-10">
                  <a
                    href="https://www.avito.ru/brands/antik1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-dark/60 text-parchment border border-gold/20 px-4 py-3 rounded-xl hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all shadow-md active:scale-95"
                  >
                    <span className="font-bold text-sm text-[#00AAFF]">Av</span>
                    <span className="text-sm font-medium tracking-wide">Авито</span>
                  </a>
                  <a
                    href="https://vk.com/clubgalleru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-dark/60 text-parchment border border-gold/20 px-4 py-3 rounded-xl hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all shadow-md active:scale-95"
                  >
                    <span className="font-bold text-sm text-[#0077FF]">VK</span>
                    <span className="text-sm font-medium tracking-wide">VK ВКонтакте</span>
                  </a>
                  <a
                    href="https://rutube.ru/channel/76051106/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-dark/60 text-parchment border border-gold/20 px-4 py-3 rounded-xl hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all shadow-md active:scale-95"
                  >
                    <span className="font-bold text-sm text-[#00AAFF]">RT</span>
                    <span className="text-sm font-medium tracking-wide">Rutube</span>
                  </a>
                  <a
                    href="https://t.me/+o6vNZULvpwwyZTRi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-dark/60 text-parchment border border-gold/20 px-4 py-3 rounded-xl hover:border-gold/60 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all shadow-md active:scale-95"
                  >
                    <span className="font-bold text-sm text-[#0088cc]">TG</span>
                    <span className="text-sm font-medium tracking-wide">Telegram Канал</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
