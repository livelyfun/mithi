import type { Metadata } from "next";
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mithlesh Kumar Das — Backend & Full-Stack Developer",
  description:
    "Portfolio of Mithlesh Kumar Das, an entry-level backend and full-stack developer skilled in Python, JavaScript, React.js, Next.js, Firebase, and GraphQL.",
  keywords: [
    "Mithlesh Kumar Das",
    "full-stack developer",
    "backend developer",
    "React",
    "Next.js",
    "Python",
    "Firebase",
    "GraphQL",
    "portfolio",
  ],
  authors: [{ name: "Mithlesh Kumar Das" }],
  openGraph: {
    title: "Mithlesh Kumar Das — Backend & Full-Stack Developer",
    description:
      "Portfolio of Mithlesh Kumar Das, an entry-level backend and full-stack developer skilled in Python, JavaScript, React.js, Next.js, Firebase, and GraphQL.",
    type: "website",
    locale: "en_US",
    siteName: "Mithlesh Kumar Das",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithlesh Kumar Das — Backend & Full-Stack Developer",
    description:
      "Portfolio of Mithlesh Kumar Das, an entry-level backend and full-stack developer skilled in Python, JavaScript, React.js, Next.js, Firebase, and GraphQL.",
  },
};

const themeScript = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored === "dark" || (!stored && true);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
