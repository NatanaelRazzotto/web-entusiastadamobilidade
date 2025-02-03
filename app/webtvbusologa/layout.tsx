import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from '../ui/dashboard/sidenavManager';

import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import SideNavMobile from '../ui/dashboard/sidenavMobile';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
       
            <div className="block md:hidden">
                 <SideNavMobile />
               </div>
               <div className="hidden md:block">
                 <SideNav />
               </div>
       
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>      


  );
}