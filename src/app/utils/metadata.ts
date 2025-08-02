import { Metadata } from 'next';

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = 'Discover and explore our collection of articles, insights, and resources.',
  keywords = ['blog', 'articles', 'insights', 'resources'],
  image = '/images/default-og.jpg',
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const siteName = 'My Blog';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteName }],
    openGraph: {
      title: fullTitle,
      description,
      url: 'https://myblog.com',
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },

    verification: {
      google: 'your-google-site-verification',
    },
  };
} 