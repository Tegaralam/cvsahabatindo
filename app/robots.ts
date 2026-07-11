import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Uncomment and replace with your actual domain when deploying
    // sitemap: 'https://your-domain.com/sitemap.xml',
  }
}
