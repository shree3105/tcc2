import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Cardiology Clinic - Dr Sujata Khambekar",
  description: "Consultant Cardiologist in Poole and Bournemouth. Expert in cardiac risk assessment, coronary artery disease, atrial fibrillation, and more.",
  keywords: "cardiologist, cardiology, Poole, Bournemouth, heart specialist, cardiac care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
