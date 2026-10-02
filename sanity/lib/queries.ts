import { defineQuery } from 'next-sanity'

const imageFields = /* groq */ `asset, hotspot, crop, alt`

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  logo{${imageFields}},
  logoText{prefix, highlight, suffix},
  menuLabel,
  navMenus[]{_key, label, emptyText, links[]{_key, label, href}},
  footerText
}`)

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  hero{heading, image{${imageFields}}},
  about{heading, body, images[]{_key, ${imageFields}}},
  faq{heading, items[]{_key, question, answer}},
  testimonials{heading, items[]{_key, quote, name, role, photo{${imageFields}}}}
}`)

export const seasonPageQuery = defineQuery(`*[_type == $type && year == $year][0]{
  year,
  title,
  intro
}`)

export const coursePageQuery = defineQuery(`*[_type == "coursePage" && year == $year][0]{
  year,
  title,
  hero{eyebrow, heading, "videoUrl": video.asset->url, "videoType": video.asset->mimeType, poster{${imageFields}}},
  about{heading, body},
  details{heading, items},
  photos{heading, images[]{_key, ${imageFields}}}
}`)

export const eventPhotosPageQuery = defineQuery(`*[_type == "eventPhotosPage" && year == $year][0]{
  year,
  title,
  eyebrow,
  heading,
  photos[]{_key, ${imageFields}}
}`)

export const swagPageQuery = defineQuery(`*[_type == "swagPage" && year == $year][0]{
  year,
  title,
  eyebrow,
  heading,
  image{${imageFields}},
  body
}`)

export const playerBiosPageQuery = defineQuery(`*[_type == "playerBiosPage" && year == $year][0]{
  year,
  title,
  eyebrow,
  heading,
  teams[]{_key, name, players[]{_key, name, role, bio, photo{${imageFields}}}}
}`)

export const waitlistPageQuery = defineQuery(`*[_type == "waitlistPage"][0]{
  title,
  eyebrow,
  heading,
  intro,
  form
}`)
