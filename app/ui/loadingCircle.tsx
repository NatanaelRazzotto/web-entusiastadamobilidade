"use client"
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import AcmeLogo from './acme-logo';

export default function LoadingCircle() {
  return (
    <main className="flex justify-center items-center h-screen">

<div className="p-4 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-lg">
        <AcmeLogo />
      </div>        
    <div className="flex flex-col items-center">


      <div className="spinner"></div>
    </div>
    </main>

  );
}
