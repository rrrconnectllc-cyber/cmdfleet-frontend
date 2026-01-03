"use client";

import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { Terminal } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // Listen for login events
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN') {
      router.push('/setup');
    }
  });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-blue-500">
      <div className="w-full max-w-md">
        
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <Terminal className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">CMD FLEET</h1>
          <p className="text-gray-400">Sign in to your Command Center.</p>
        </div>

        {/* SUPABASE AUTH WIDGET */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb', // Blue-600
                    brandAccent: '#1d4ed8', // Blue-700
                    inputText: 'white',
                    inputBackground: 'black',
                    inputBorder: '#3f3f46',
                  },
                },
              },
              className: {
                 button: 'font-bold rounded-lg',
                 input: 'rounded-lg',
              }
            }}
            theme="dark"
            providers={['google', 'github']} // <--- Adds the Buttons!
            redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/setup`}
          />
        </div>

      </div>
    </div>
  );
}
