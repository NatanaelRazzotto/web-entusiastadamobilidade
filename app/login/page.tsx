"use client";
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { useState } from "react";
import SimpleLoginForm from "../ui/simple-login-form";

export default function LoginPage() {
  const [typeLogin, setTypeLogin] = useState<boolean>(true);

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
        {typeLogin ? (
          <SimpleLoginForm />
        ) : (
          <LoginForm  />
        )}
      </div>

  );
}
