import './globals.css'
import { Quicksand } from '@next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={quicksand.className}>
        {children}
      </body>
    </html>
  )
}
