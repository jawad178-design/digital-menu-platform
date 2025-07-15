import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'MenuPro - منصة القوائم الرقمية',
  description: 'منصة شاملة لإنشاء وإدارة قوائم المطاعم الرقمية مع رمز QR',
  generator: 'MenuPro',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
