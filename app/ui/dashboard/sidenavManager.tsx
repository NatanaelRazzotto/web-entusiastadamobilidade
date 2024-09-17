"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links-portal';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useSession, signOut as nextAuthSignOut, getSession, signOut } from 'next-auth/react'; // Use signOut do next-auth
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { serverSignOut } from '../imageViewer/serverActions';
import NavLinksManager from './nav-links-portal-manager';


export default function SideNav() {
  //const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [forceUpdate, setForceUpdate] = useState(0);

  // useEffect(() => {
  //   console.log("🚀************** ~ useEffect ~ status:", status)
  //   if (status === 'authenticated' || status === 'unauthenticated') {
   
  //     // Atualize o componente quando a sessão mudar
  //     setForceUpdate(prev => prev + 1);
  //   }
  // }, [status]);

  const [session, setSession] = useState(null);
  console.log("🚀 ~ SideNav ~ session:", session)
 

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log("🚀 ~ fetchSession ~ session:", session)
      setSession(session);

    };
    fetchSession();
  }, []);


  const handleSignOut = async () => {
    //await serverSignOut(); // Chama sua função de logout do servidor
    //await nextAuthSignOut(); // Chama o signOut do next-auth
    signOut({ callbackUrl: "/" }); // Redireciona para a página inicial após o logout

   // router.push('/login'); // Redireciona para a página de login
  };

  return (
    <div key={forceUpdate} className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-950 md:h-40"
        href="/"
      >
        <div style={{ height: "100%", width: "5%", backgroundColor: "brown", left: "0px" }}></div>
        <div style={{ height: "100%", width: "5%", backgroundColor: "chocolate", right: "0px", left: "auto" }}></div>
        <div className="w-4/5 pb-4 pl-4 ">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        {session ?
      
            <NavLinksManager session={session}/>
        
          : ""
        }
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        {!session && (
          <Link
            href="/login"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <ArrowRightIcon className="w-5 md:w-6" />  <span>Log in Manager</span>
          </Link>
        )}
        {session && (
          <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        )}
      </div>
    </div>
  );
}
