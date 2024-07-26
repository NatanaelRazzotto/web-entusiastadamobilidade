"use client";
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { useState } from "react";
import SimpleLoginForm from "../ui/simple-login-form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { lusitana } from "../ui/fonts";

export default function LoginPage() {
  const [typeLogin, setTypeLogin] = useState<boolean>(true);
  const router = useRouter();
  const { data: session, status } = useSession();  

  const toggleLoginType = () => {
    setTypeLogin((prevTypeLogin) => !prevTypeLogin);
  };

  return (

      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-slate-950 md:h-36 relative">
          <div
            style={{ height: "100%", width: "5%", backgroundColor: "brown", left: "0px" }}
          ></div>
          <div
            style={{ height: "100%", width: "5%", backgroundColor: "chocolate", right: "0px", left: "auto" }}
          ></div>
          <div className="w-32 p-4 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
              className={`px-4 py-2 rounded ${!typeLogin ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => setTypeLogin(false)}
            >
              Via Email
            </button>
          <button
            className={`px-4 py-2 rounded ${typeLogin ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setTypeLogin(true)}
          >
            Via Telefone
          </button>
   
        </div>
        {session && session.user.id ?     
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Login Realizado Com Sucesso!
        </h1>
        <p>Click em "Home" e acesse as FUNCIONALIDADE!</p> </div>
        
        :       
        
        typeLogin ? (
          <SimpleLoginForm />
        ) : (
          <LoginForm  />
        )}

      <div className="mt-4 space-y-3">         
        
        <Button className="w-full" onClick={() => router.push('/')}>
          Go to Home <HomeIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
      </div>

  );
}
