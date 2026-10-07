

export default function Navbar() {
  return (
    <header className="nav">

  <div className="nav-inner">

    <a href="#" className="logo">
      LEWLEW SITE
    </a>

    <nav className="nav-links">
      <a href="#works">Works</a>
      <a href="#gallery">Gallery</a>
      <a href="#news">News</a>
      <a href="#fanclub">Fanclub</a>
    </nav>

    
    <button
      className="menu-button"
      type="button"
      aria-label="Open navigation"
      aria-expanded="false"
    >
      <span className="menu-text">Menu</span>
      <span className="menu-icon">
        <span></span>
        <span></span>
      </span>
    </button>

  </div>

</header>
  );
}