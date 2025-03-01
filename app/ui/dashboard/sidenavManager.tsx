"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links-portal';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, PowerIcon, UserIcon , Bars3Icon} from '@heroicons/react/24/outline';
import { useSession, signOut as nextAuthSignOut, getSession, signOut } from 'next-auth/react'; // Use signOut do next-auth
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { serverSignOut } from '../imageViewer/serverActions';
import NavLinksManager from './nav-links-portal-manager';
import ThemeSwitcher from '../themeSwitcher ';
import SiteLogo from '../site-logo';


export default function SideNav() {
  //const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [forceUpdate, setForceUpdate] = useState(0);

  const [rotate, setRotate] = useState(true);

  // useEffect(() => {
  //   console.log("🚀************** ~ useEffect ~ status:", status)
  //   if (status === 'authenticated' || status === 'unauthenticated') {
   
  //     // Atualize o componente quando a sessão mudar
  //     setForceUpdate(prev => prev + 1);
  //   }
  // }, [status]);

  const [session, setSession] = useState(null);

 

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();

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

  const handleRotate = () => {
    setRotate((prev) => !prev); // Alterna entre rotacionar e não rotacionar
  };

  return (
    <div className={`flex-none ${
      rotate ? 'w-20 h-[100%]' : 'w-64 h-[100%]'
    } `}>
    <div key={forceUpdate} className="flex h-full flex-col px-3 py-4 md:px-2 bg-secondarybg-dark text-text-dark">
      <div
        className="mb-2 flex h-20 md:h-40 items-center justify-center rounded-md bg-black"
      >
        <div style={{ height: "100%", width: "5%", backgroundColor: "brown" }} />
        <div style={{ height: "100%", width: "5%", backgroundColor: "chocolate" }} />
        <div style={{ height: "100%", width:"90%" }} className="flex  flex-col justify-end">
          <div
            className={`relative h-20 w-20 md:h-40 md:w-40 transition-transform duration-500 ${
              rotate ? '-rotate-90' : ''
            } items-center justify-center`}
          >
            <SiteLogo definition={rotate}/>
          </div>
        </div>
      </div>

      <div className="my-2 border-b border-primarybg-dark" /> {/* Linha de separação */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks definition={rotate}/>
        <div className="my-2 border-b border-primarybg-dark" /> {/* Linha de separação */}
        {session && session.user.role == 1 ?
      
            <NavLinksManager session={session} definition={rotate}/>
        
          : ""
        }
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <div className="my-2 border-b border-primarybg-dark" /> {/* Linha de separação */}
        <ThemeSwitcher/>
        <button
          onClick={handleRotate}     
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-orange-700 sp-3 text-sm font-medium hover:bg-primarybg-dark hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"     
        >
            <Bars3Icon className="w-5 md:w-6 " />
        </button>
        <div className="my-2 border-b border-primarybg-dark" /> {/* Linha de separação */}
        {!session && (
          <Link
            href="/login"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-orange-700 p-3 text-sm font-medium hover:bg-primarybg-dark hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <UserIcon className="w-5 md:w-6 " />
            {!rotate ? <span>Log in Manager</span> : ""}
            
          </Link>
        )}
        {session && (
          <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-orange-700 sp-3 text-sm font-medium hover:bg-primarybg-dark hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            {!rotate ?   <p className="hidden md:block">Sign Out</p> : ""}
          
          </button>
        )}
      </div> 
        
       
   
    </div>
    </div>
  );
}
