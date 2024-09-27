"use client"
// pages/index.js
import Head from 'next/head';
import { useEffect } from 'react';
import LoadingCircle from './ui/loadingCircle';


export default function Loading() {
  return (
    <div className="  bg-secondarybg-dark text-text-dark  rounded-md shadow-md p-4">
      <LoadingCircle/>
    </div>
  );
}
