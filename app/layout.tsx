import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://location-markerv.vercel.app/"), // 🔁 replace with your real domain

    title: {
        default: "Restaurant Location Manager",
        template: "%s | Restaurant Location Manager",
    },

    description:
        "Capture and manage restaurant locations with precise geolocation and image uploads. Fast, mobile-optimized, and reliable.",

    keywords: [
        "restaurant location",
        "geolocation app",
        "restaurant management",
        "map location capture",
        "location tracker",
    ],

    authors: [{ name: "Obe Fortune" }],
    creator: "Obe Fortune",
    publisher: "Fortune's Wens",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://location-markerv.vercel.app/",
        title: "Restaurant Location Manager",
        description:
            "Easily capture and store restaurant locations with geolocation and image support.",
        siteName: "Restaurant Location Manager",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Restaurant Location Manager Preview",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Restaurant Location Manager",
        description:
            "Capture and manage restaurant locations with precision and simplicity.",
        images: ["/og-image.png"],
    },

    category: "technology",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#000000",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        >
        <main>{children}</main>
        </body>
        </html>
    );
}
