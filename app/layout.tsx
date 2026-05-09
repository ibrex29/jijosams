import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/context/ReactQueryProvider";
import AuthProvider from "@/context/AuthProvider";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jigawa Journal of Social and Management Sciences (JIJOSAMS)",
  description:
    "Bi-annual peer-reviewed print and e-journal by the Faculty of Social and Management Sciences, Sule Lamido University, Kafin Hausa, Jigawa State, Nigeria.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <AuthProvider>
          <QueryClientProvider>
            <div>
              <main>{children}</main>
            </div>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
