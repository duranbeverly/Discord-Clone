import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

// Phone layout state: the left drawer (server rail + channel/DM list) and the right member list.
// The wrapper div uses display: contents (see mobile.css), so desktop layout is untouched.
const MobileNavContext = React.createContext({});

export function MobileNavProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const { pathname } = useLocation();

  const closeAll = () => {
    setDrawerOpen(false);
    setMembersOpen(false);
  };

  // picking a channel, DM or server changes the route, so close the panels
  useEffect(closeAll, [pathname]);

  let className = "app-shell";
  if (drawerOpen) className += " drawer-open";
  if (membersOpen) className += " members-open";

  return (
    <MobileNavContext.Provider value={{ setDrawerOpen, setMembersOpen }}>
      <div className={className}>
        {children}
        {(drawerOpen || membersOpen) && (
          <>
            <div className="mobile-backdrop" onClick={closeAll} />
            <button className="mobile-drawer-close" aria-label="Close menu" onClick={closeAll}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </>
        )}
      </div>
    </MobileNavContext.Provider>
  );
}

export const useMobileNav = () => useContext(MobileNavContext);

// Hamburger shown in the top bar on phones
export function MobileMenuButton() {
  const { setDrawerOpen } = useMobileNav();
  return (
    <button className="mobile-menu-btn" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
      <i className="fa-solid fa-bars"></i>
    </button>
  );
}

// Opens the member list (or the developer list on the DM pages) on phones
export function MobileMembersButton() {
  const { setMembersOpen } = useMobileNav();
  return (
    <button className="mobile-members-btn" aria-label="Show member list" onClick={() => setMembersOpen(true)}>
      <i className="fa-solid fa-users"></i>
    </button>
  );
}
