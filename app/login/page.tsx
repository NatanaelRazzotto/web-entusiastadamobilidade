import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      <div className="flex h-20 w-full items-end rounded-lg  bg-slate-950 md:h-36 relative">
        <div style={{ height: "100%", width: "5%", backgroundColor: "brown", left: "0px" }}></div>
        <div style={{ height: "100%", width: "5%", backgroundColor: "chocolate", right: "0px", left: "auto" }}></div>
        <div className='w-32 p-4 text-white md:w-36'>
          <AcmeLogo />
        </div>     
      </div>
        <LoginForm />
      </div>
    </main>
  );
}