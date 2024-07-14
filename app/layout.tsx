import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from './ui/dashboard/sidenavManager';

import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';



 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>"Portal do Entusiasta"</title>
        <meta property="og:title" content={"Portal do Entusiasta"} />
        <meta property="og:description" content={"O Portal do Entusiasta"} />
        <meta property="og:image" content={"https://drive.google.com/thumbnail?id=1qbDWMQiF_MIGmiPXz3WD3t8ptlhAE90r&sz=w1000"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://entusiastadamobilidade.vercel.app/" />
      </Head>
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>      
        <Analytics />
      </body>
    </html>
  );
}