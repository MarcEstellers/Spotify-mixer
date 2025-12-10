'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="h-screen w-screen bg-[#121212] flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold text-[#1db954]">🎵 Spotify Taste Mixer</h1>
      <p className="text-gray-400 text-lg">Crea la playlist perfecta según tus gustos</p>
      
      <button
        onClick={handleLogin}
        className="bg-[#1db954] text-black font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition-all"
      >
        Iniciar sesión con Spotify
      </button>
    </div>
  );
}
