import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sule Lamido University - Journal of Science and Technology",
  description:
    "A peer-reviewed journal publishing cutting-edge research in science and technology from Sule Lamido University.",
  keywords: [
    "Sule Lamido University",
    "Journal",
    "Science",
    "Technology",
    "Research",
    "Publications",
  ],
  authors: [{ name: "Sule Lamido University", url: "https://your-domain.com" }],
  openGraph: {
    title: "Sule Lamido University - Journal of Science and Technology",
    description:
      "Explore research papers and scientific advancements at Sule Lamido University.",
    url: "https://your-domain.com",
    siteName: "SLU Journal of Science and Technology",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sule Lamido University Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "Sule Lamido University - Journal of Science and Technology",
    description:
      "Peer-reviewed scientific research from Sule Lamido University.",
    images: ["https://your-domain.com/images/twitter-card.jpg"],
  },
};