'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  UserPlusIcon,
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function LoginForm() {
  const router = useRouter(); // Inicializa o useRouter
  const [errorMessage, setErrorMessage] = useState('');
 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento

  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    
    // formData.append('password', password);

    const result = await authenticate(undefined, formData);

    if (result.success) {
      router.push('/'); // Redireciona para a página inicial
    } else {
      setErrorMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Login Com Seu E-MAIL
        </h1>
        <p>Esta forma só é válida para usuários JÁ CADASTRADOS!</p>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="phone"
            >
              E-mail
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Chave de Acesso
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Número informado na inscrição"
                required
                minLength={4}
                maxLength={6}
                value={password}
                onChange={handlePasswordChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <LoginButton loading={loading} />
      </div>
    </form>
  );
}

function LoginButton({ loading }) {
  return (
    <Button className="mt-4 w-full" aria-disabled={loading}>
      {loading ? 'Logging in...' : 'Log in'}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
