import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyContactWidget } from '@/components/contact/StickyContactWidget'

export const metadata: Metadata = {
  title: {
    default: 'Галерея ЛИК — Предметы искусства Востока',
    template: '%s | Галерея ЛИК',
  },
  description:
    'Галерея ЛИК — экспертная оценка, покупка и продажа предметов восточного искусства: буддизм, Гималаи, Китай, Тибет, Монголия. Профессиональная реставрация и экспертиза.',
  keywords: ['галерея', 'восток', 'буддизм', 'антиквариат', 'скупка', 'оценка', 'реставрация'],
  openGraph: {
    siteName: 'Галерея ЛИК',
    locale: 'ru_RU',
    type: 'website',
  },
  verification: {
    yandex: '4a53403c8f37661f',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''
  const max = process.env.NEXT_PUBLIC_MAX ?? ''
  const phone = process.env.NEXT_PUBLIC_PHONE ?? ''

  return (
    <html lang="ru" className="scroll-smooth">

      {/* ✅ Яндекс Метрика */}
      <head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108235719','ym');

        ym(108235719, 'init', {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        });
      `,
    }}
  />
</head>

      <body className="bg-dark text-parchment font-sans antialiased min-h-screen flex flex-col">

        {/* fallback для noscript */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108235719"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>

        <Header />

        <main className="flex-1">{children}</main>

        <Footer
          phone={phone}
          telegram={telegram}
          max={max}
        />

        <StickyContactWidget
          telegram={telegram}
          max={max}
          phone={phone}
        />

      </body>
    </html>
  )
}
