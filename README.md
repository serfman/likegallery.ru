# Галерея ЛИК — likegallery.ru

Сайт галереи восточного искусства. Фокус на inbound sourcing — конверсия посетителей в покупателей через WhatsApp / Telegram / WeChat.

## Стек

- **Next.js 15** (App Router, TypeScript)
- **Sanity.io** (headless CMS, Studio встроен по `/studio`)
- **Tailwind CSS**
- **Timeweb Cloud** — подтверждённое production-размещение на 2026-11-06: nginx → Next.js под PM2.

## Production и диагностика

Сайт работает на сервере Timeweb Cloud: nginx принимает HTTPS и передаёт запросы на `localhost:3000`. Приложение PM2 — `likegallery`, рабочий каталог — `/root/likegallery.ru`. Автодеплой при push в main не подтверждён; перед развёртыванием необходимо проверить действующий процесс и локальные изменения сервера.

Подробности инфраструктуры, результаты проверки и ограничения: [отчёт о диагностике HTTPS от 2026-11-06](docs/reports/2026-11-06-https-delay-diagnostics.md).

## Быстрый старт

```bash
npm install
cp .env.local.example .env.local
# Заполнить .env.local — Sanity project ID и контакты
npm run dev
```

## Настройка Sanity

1. Создать проект: `npx sanity init` (или создать вручную на sanity.io/manage)
2. Скопировать `projectId` в `.env.local`
3. Открыть `http://localhost:3000/studio` — Sanity Studio встроен

## Настройка ISR Webhook (для обновления страниц при изменениях в CMS)

1. В sanity.io → Manage → API → Webhooks → Add webhook
2. URL: `https://likegallery.ru/api/revalidate`
3. HTTP Method: POST
4. Trigger: Create, Update, Delete
5. Filter: `_type == "item" || _type == "serviceCase"`
6. Projection: `{ _type, "slug": slug.current }`
7. HTTP Headers: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`

## Переменные окружения

Необходимые переменные перечислены в `.env.local.example`. В production они должны быть доступны приложению при сборке и запуске. Фактический способ передачи переменных на сервере в рамках диагностики HTTPS не проверялся; не публиковать значения секретов.

## Структура

```
src/app/           — страницы (Next.js App Router)
src/components/    — React компоненты
src/lib/sanity/    — Sanity client, image builder, GROQ queries
src/sanity/schemas/ — Sanity схемы данных
src/types/         — TypeScript типы
sanity.config.ts   — Конфигурация Sanity Studio
```
