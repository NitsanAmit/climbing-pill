import './auth.scss';

export default function Layout ({ children }) {
  return (
    <div className="auth-bg">
      <div className="logo-container">
        <div className="logo-base logo">Climbing Pill</div>
        <div className="logo-base slogan">Climbers like us train like this</div>
      </div>
      {children}
    </div>
  )
}
