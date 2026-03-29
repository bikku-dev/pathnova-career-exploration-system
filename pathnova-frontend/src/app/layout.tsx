import "./globals.css"
import { Toaster } from "react-hot-toast"
import SmoothScroll from "@/components/animations/SmoothScroll"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased overflow-x-hidden">

        {/* Smooth Scroll System */}
        <SmoothScroll />

        {/* Page Content */}
        {children}

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111827",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "14px"
            },
          }}
        />

      </body>
    </html>
  )
}