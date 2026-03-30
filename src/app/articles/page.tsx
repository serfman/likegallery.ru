import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: { asset: object; alt?: string }
  publishedAt?: string
}

const ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc) {
    _id, title, slug, excerpt, coverImage, publishedAt
  }
`

export default async function ArticlesPage() {
  let articles: Article[] = []
  try {
    articles = await client.fetch<Article[]>(ARTICLES_QUERY)
  } catch {
    // Sanity не настроен
  }

  return (
    <main className="min-h-screen bg-dark">
      {/* Hero-шапка страницы */}
      <div className="relative py-20 border-b border-gold/10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="section-container text-center relative z-10">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">
            Галерея ЛИК
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-parchment">
            Статьи
          </h1>
          <p className="text-parchment/50 mt-4 max-w-xl mx-auto">
            Экспертные материалы о восточном искусстве, антиквариате и коллекционировании
          </p>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className="section-container py-16">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-parchment/40 text-xl">Статьи скоро появятся</p>
            <p className="text-parchment/30 text-sm mt-2">Следите за обновлениями галереи</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function ArticleCard({ article }: { article: Article }) {
  const imageUrl = article.coverImage
    ? urlFor(article.coverImage).width(800).height(500).auto('format').url()
    : null

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <article className="group bg-dark-card rounded-xl overflow-hidden border border-gold/10 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
      <Link href={`/articles/${article.slug.current}`} className="block relative aspect-[16/10] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt ?? article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-dark-soft flex items-center justify-center">
            <span className="text-parchment/20 font-serif text-lg">ЛИК</span>
          </div>
        )}
        {/* золотой оверлей при ховере */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </Link>

      <div className="p-5 space-y-3">
        {date && (
          <p className="text-gold/60 text-xs uppercase tracking-wider font-medium">{date}</p>
        )}
        <h2 className="font-serif text-parchment text-lg leading-snug line-clamp-2">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-parchment/55 text-sm leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="pt-1">
          <Link
            href={`/articles/${article.slug.current}`}
            className="inline-block border border-gold/50 text-gold text-xs px-4 py-2 rounded-lg hover:bg-gold hover:text-dark transition-colors duration-200 font-semibold"
          >
            Читать статью →
          </Link>
        </div>
      </div>
    </article>
  )
}
