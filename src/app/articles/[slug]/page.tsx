import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

interface Article {
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: { asset: object; alt?: string }
  body?: any[]
  publishedAt?: string
}

const ARTICLE_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    title, slug, excerpt, coverImage, body, publishedAt
  }
`

const ALL_SLUGS_QUERY = `*[_type == "article"].slug.current`

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(ALL_SLUGS_QUERY)
  return slugs.map((slug) => ({ slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await client.fetch<Article | null>(ARTICLE_QUERY, {
    slug,
  })

  if (!article) notFound()

  const imageUrl = article.coverImage
    ? urlFor(article.coverImage).width(1400).height(700).auto('format').url()
    : null

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <main className="min-h-screen bg-dark">
      {imageUrl && (
        <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt ?? article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/20 to-dark" />
        </div>
      )}

      <div className="section-container max-w-3xl mx-auto py-12">
        <nav className="flex items-center gap-2 text-xs text-parchment/40 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-gold transition-colors">Статьи</Link>
          <span>/</span>
          <span className="text-parchment/60 line-clamp-1">{article.title}</span>
        </nav>

        {date && (
          <p className="text-gold/60 text-xs uppercase tracking-[0.2em] mb-4">{date}</p>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment mb-6 leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-parchment/60 text-lg leading-relaxed mb-10 border-l-2 border-gold/40 pl-5 italic font-serif">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gold/15" />
          <span className="text-gold/30 text-xs">✦</span>
          <div className="h-px flex-1 bg-gold/15" />
        </div>

        {article.body && (
          <div className="prose-article">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gold/10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-gold text-sm hover:text-gold/70 transition-colors"
          >
            ← Все статьи
          </Link>
        </div>
      </div>
    </main>
  )
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-parchment/75 text-base leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-parchment text-2xl sm:text-3xl mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-parchment text-xl mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold/50 pl-5 my-6 italic font-serif text-parchment/60 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-parchment font-semibold">{children}</strong>,
    em: ({ children }) => <em className="text-parchment/80 italic">{children}</em>,
    link: ({ children, value }) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2 hover:text-gold/70 transition-colors">{children}</a>,
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value).width(900).auto('format').url()
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gold/10">
            <Image src={url} alt={value.alt ?? ''} fill className="object-cover" />
          </div>
          {value.alt && (
            <figcaption className="text-parchment/40 text-sm text-center mt-3 italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
