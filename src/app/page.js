'use client';
import ClientWrapper from '@/components/ClientWrapper';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Redirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/dashboard'); }, [router]);
  return null;
}

export default function Home() {
  return (
    <ClientWrapper>
      <Redirect />
    </ClientWrapper>
  );
}
