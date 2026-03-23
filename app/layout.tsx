import './globals.css'

export const metadata = {
  title: 'The Cardiology Clinic',
  description: 'Dr Sujata Khambekar - Consultant Cardiologist in Poole and Bournemouth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
