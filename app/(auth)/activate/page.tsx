import Link from 'next/link';

export default function ActivatePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#FBF4EC', padding: '40px' }}
    >
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div
          className="flex items-center justify-center mb-[22px]"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '18px',
            background: 'linear-gradient(155deg, #F8C3A8, #F2937A)',
            boxShadow: '0 12px 26px -10px rgba(238,129,100,.65)',
          }}
        >
          <svg
            width="30"
            height="30"
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

        {/* Heading */}
        <h1
          className="font-fredoka font-semibold text-[32px] leading-[1.15] text-[#3F362E] mb-[8px]"
          style={{ margin: '0 0 8px' }}
        >
          Bienvenida a OpenDayCare
        </h1>
        <p
          className="text-[15.5px] leading-[1.55] text-[#94887B] mb-[26px]"
          style={{ margin: '0 0 26px' }}
        >
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar
          la cuenta.
        </p>

        {/* Invitation card */}
        <div
          className="flex items-center gap-[14px] rounded-[16px] px-[16px] py-[14px] mb-[22px]"
          style={{
            background: '#fff',
            border: '1.5px solid #EADFD0',
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: '44px',
              height: '44px',
              background: '#A9D9E8',
              color: '#1F7A93',
              fontFamily: 'var(--font-fredoka)',
              fontWeight: 600,
              fontSize: '19px',
            }}
          >
            M
          </div>
          <div>
            <div className="text-[13px] text-[#94887B]">Te invitaron a seguir a</div>
            <div className="font-fredoka font-semibold text-[17px] text-[#3F362E]">
              Mateo · Sala Soles
            </div>
          </div>
        </div>

        {/* Invitation code */}
        <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[8px]">
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          defaultValue="7K4P9"
          className="w-full px-[16px] py-[14px] rounded-[14px] text-[18px] tracking-[3px] font-bold text-[#3F362E] font-fredoka mb-[18px]"
          style={{
            border: '1.5px solid #EADFD0',
            background: '#fff',
          }}
        />

        {/* Email */}
        <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[8px]">
          EMAIL
        </div>
        <input
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          className="w-full px-[16px] py-[14px] rounded-[14px] text-[15px] text-[#3F362E] mb-[18px]"
          style={{
            border: '1.5px solid #EADFD0',
            background: '#fff',
          }}
        />

        {/* Password */}
        <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[8px]">
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          defaultValue="contraseña"
          className="w-full px-[16px] py-[14px] rounded-[14px] text-[15px] text-[#3F362E] mb-[18px]"
          style={{
            border: '1.5px solid #F2A78E',
            background: '#fff',
          }}
        />

        {/* Authorization checkbox */}
        <label
          className="flex items-start gap-[12px] rounded-[14px] px-[16px] py-[14px] mb-[24px] cursor-pointer"
          style={{
            background: '#FBF1D6',
          }}
        >
          <span
            className="flex-none flex items-center justify-center rounded-[8px] mt-[1px]"
            style={{
              width: '24px',
              height: '24px',
              background: '#5FB97E',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[14px] text-[#8A7234] leading-[1.45]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de
            la app.
          </span>
        </label>

        {/* Activate button */}
        <a
          href="#"
          className="block text-center w-full py-[15px] rounded-[15px] font-extrabold text-[16px] text-white"
          style={{
            background: 'linear-gradient(180deg, #F4977E, #EE8164)',
            boxShadow: '0 10px 22px -8px rgba(238,129,100,.7)',
          }}
        >
          Activar mi cuenta
        </a>

        {/* Footer link */}
        <p className="text-center mt-[22px] text-[#94887B] text-[14.5px]" style={{ margin: '22px 0 0' }}>
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-[#C5503A] font-extrabold">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
