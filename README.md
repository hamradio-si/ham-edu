# Radioamaterski izobraževalni portal

Next.js + Strapi spleta stran za izobraževanje radioamaterjev in kandidatov za radioamaterski izpit.

## Zaženi "development" okolje

```bash
yarn dev
```

## Zaženi "production" okolje

```bash
yarn build
yarn start
```

## Okoljske spremenljivke

File: `.env.local`

```
WEBSITE_URL=https://edu.jkob.cc
STRAPI_URL=https://strapi.jkob.cc
STRAPI_TOKEN=...
```

## Priprava Strapi Webhooka

- Pojdi na `[STRAPI_URL]/admin/settings/webhooks`
- Dodaj nov webhook
- URL: `[WEBSITE_URL]/api/strapi`
- Headers: `Authorization: Bearer [STRAPI_TOKEN]`
- Events: `entry.create`, `entry.update`, `entry.delete`, `entry.publish`, `entry.unpublish`

## TODO

- [x] Tečaji
  - [x] Online tečaji
  - [ ] Posneti tečaji
  - [ ] Tečaji v živo
  - [ ] Uvajanje / začetki radioamaterstva
- [x] Pagination
- [ ] Iskanje po vsebini
- [x] Zbirka vprašanj
  - [ ] Pagination
  - [ ] Search
  - [ ] Filter
- [x] Simulator izpita
- [x] Scroll to top button
- [x] Footer
- [x] Revalidate API + Webhook
- [ ] Analytics
- [x] SEO
  - [x] Metadata
  - [x] OpenGraph
  - [ ] Twitter
  - [ ] JSON-LD ?
- [x] Sitemap, robots.txt
- [ ] PWA ??
