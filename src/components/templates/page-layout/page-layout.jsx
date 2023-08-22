import React, { useState } from 'react';
import './page-layout.scss';

function PageLayout({ children, user, signOut }) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    if (openMenu === true) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  return (
    <div className="page-layout">
      <nav className="page-layout__nav-menu">
        <div>
          <h1> RETO PRAGMA AWS</h1>
        </div>
        <div
          className="page-layout__nav-menu__user"
          onClick={handleOpenMenu}
          aria-hidden="true"
        >
          {user.attributes.email}
        </div>
        <div
          className={`page-layout__nav-menu__menu-float ${
            openMenu ? '--open' : ''
          }`}
        >
          <button
            type="button"
            className="page-layout__nav-menu__button"
            onClick={signOut}
          >
            Cerrar sesion
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default PageLayout;
