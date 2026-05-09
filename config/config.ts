import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jigawa Journal of Social and Management Sciences (JIJOSAMS)",
  description:
    "Bi-annual peer-reviewed print and e-journal published by the Faculty of Social and Management Sciences, Sule Lamido University, Kafin Hausa, Jigawa State, Nigeria.",
  keywords: [
    "JIJOSAMS",
    "Jigawa Journal",
    "Social and Management Sciences",
    "Sule Lamido University",
    "Journal",
    "Social Sciences",
    "Management Sciences",
    "Research",
    "Publications",
  ],
  authors: [{ name: "Sule Lamido University", url: "https://your-domain.com" }],
  openGraph: {
    title: "Jigawa Journal of Social and Management Sciences (JIJOSAMS)",
    description:
      "Submit and explore peer-reviewed manuscripts across social and management sciences.",
    url: "https://your-domain.com",
    siteName: "JIJOSAMS",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JIJOSAMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "Jigawa Journal of Social and Management Sciences (JIJOSAMS)",
    description:
      "Bi-annual peer-reviewed publication for social and management sciences.",
    images: ["https://your-domain.com/images/twitter-card.jpg"],
  },
};
