"use client"
// pages/index.js
import Head from 'next/head';
import { useEffect } from 'react';
import AcmeLogo from '../ui/acme-logo';
import LoadingCircle from '../ui/loadingCircle';

export default function Loading() {
  return (
   <LoadingCircle/>
  );
}
