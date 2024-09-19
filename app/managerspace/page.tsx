"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import { getSession } from "next-auth/react";
export  default async function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
    fetch('/api/images-storage')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
     
    })
  },[] )

  // const response = await fetch("", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   //  Authorization: `Bearer ${session.accessToken}`, // Passa o token no cabeçalho
  //   },    
  // });

  // if (!response.ok) {
  //   const result = await response.json();
  //   console.error(result.message);
  // } else {
  //   const result = await response.json();
  //   console.log(result.message);
  // }

  
async function handleCreateGoal(data) {
  console.log("🚀 ~ handleCreateGoal ~ data:", data);

  try {
    // Obter a sessão no lado do cliente
    const session = await getSession();
    console.log("🚀 ~ handleCreateGoal ~ session:", session)   

   
  } catch (error) {
    console.error("Erro ao registrar categoria:", error);
  }
}

  return (
    <div>
      Gerenciamento
    </div>
  
  );
}
