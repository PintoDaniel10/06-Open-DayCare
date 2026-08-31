'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Credenciales incorrectas. Intentalo nuevamente.');
      setLoading(false);
      return;
    }

    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen grid grid-cols-[1.05fr_1fr]" style={{ background: '#FBF4EC' }}>
      {/* Left panel */}
      <div
        className="relative overflow-hidden flex flex-col justify-between text-white"
        style={{
          background: 'linear-gradient(155deg, #F6A98E 0%, #F2937A 45%, #EC7E62 100%)',
          padding: '56px 60px',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute rounded-full"
          style={{
            width: '420px',
            height: '420px',
            background: 'rgba(255,255,255,.12)',
            top: '-140px',
            right: '-120px',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,.10)',
            bottom: '-110px',
            left: '-80px',
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-[13px]">
          <div
            className="flex items-center justify-center"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,.22)',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </div>
          <span
            className="font-fredoka font-semibold text-[21px] tracking-[.5px]"
          >
            OpenDayCare
          </span>
        </div>

        {/* Tagline */}
        <div className="relative">
          <h1
            className="font-fredoka font-semibold text-[42px] leading-[1.12] mb-[18px]"
            style={{ margin: '0 0 18px' }}
          >
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p
            className="text-[17px] leading-[1.6] max-w-[430px]"
            style={{ color: 'rgba(255,255,255,.92)', margin: 0 }}
          >
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>

        {/* Footer */}
        <div className="relative text-[14px]" style={{ color: 'rgba(255,255,255,.9)' }}>
          🌿 Guardería Sala Soles
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-[40px]">
        <div className="w-full max-w-[392px]">
          <h2 className="font-fredoka font-semibold text-[30px] text-[#3F362E] mb-[6px]" style={{ margin: '0 0 6px' }}>
            Iniciar sesión
          </h2>
          <p className="text-[15px] text-[#94887B] mb-[28px]" style={{ margin: '0 0 28px' }}>
            Ingresá para ver el día de hoy.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[8px]">
              EMAIL
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-[16px] py-[14px] rounded-[14px] text-[15px] text-[#3F362E]"
              style={{
                border: '1.5px solid #EADFD0',
                background: '#fff',
                marginBottom: '18px',
              }}
              required
            />

            {/* Password */}
            <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[8px]">
              CONTRASEÑA
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-[16px] py-[14px] rounded-[14px] text-[15px] text-[#3F362E]"
              style={{
                border: '1.5px solid #EADFD0',
                background: '#fff',
                marginBottom: '10px',
              }}
              required
            />

            {/* Forgot password */}
            <div className="text-right mb-[20px]">
              <span className="text-[#C5503A] text-[13.5px] font-bold cursor-pointer">
                ¿Olvidaste tu contraseña?
              </span>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="block text-center w-full py-[15px] rounded-[15px] font-extrabold text-[16px] text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(180deg, #F4977E, #EE8164)',
                boxShadow: '0 10px 22px -8px rgba(238,129,100,.7)',
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            {/* Error message */}
            {error && (
              <p className="mt-[14px] text-center text-[14px] text-red-600 font-semibold">
                {error}
              </p>
            )}
          </form>

          {/* Footer link */}
          <p className="text-center mt-[24px] text-[#94887B] text-[14.5px]" style={{ margin: '24px 0 0' }}>
            ¿Te invitó la guardería?{' '}
            <Link href="/activate" className="text-[#C5503A] font-extrabold">
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
