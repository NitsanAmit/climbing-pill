import './auth.scss';
import { Titillium_Web } from 'next/font/google';

export const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  display: 'swap',
});

export default function Layout ({ children }) {
  return (
    <div className="auth-bg">
      <div className="logo-container" style={{ fontFamily: titilliumWeb.style.fontFamily }}>
        <div className="logo-base logo">Climbing Pill</div>
        <div className="logo-base slogan">Climbers like us train like this</div>
      </div>
      <div className="auth-children-container">
        {children}
      </div>
    </div>
  );
}
