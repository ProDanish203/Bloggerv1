import { Header } from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/store/ThemeProvider'
import { AuthProvider } from "@/store/AuthProvider";

export const metadata: Metadata = {
  title: 'Blogger | Blog Application',
  description: 'Blog Application developed to view the latest blogs and you can also to write blogs',
  icons: {
    icon: [
      '/favicon.ico?v=5'
    ],
    apple: [
      '/apple-touch-icon.png?v=5' 
    ],
    shortcut:[
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <ThemeProvider>
        <AuthProvider>
          
          <body>
          
            <Header/>
            <div className='container'>
              {children}
            </div>
            <Footer/>
          </body>

        </AuthProvider>
      </ThemeProvider>
    </html>
  )
}
