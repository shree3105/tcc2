export const metadata = {
  title: 'The Cardiology Clinic',
  description: 'Consultant Cardiologist in Poole and Bournemouth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Or for PNG: <link rel="icon" href="/favicon.png" type="image/png" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
