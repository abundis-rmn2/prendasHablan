import * as React from "react";
import { Link } from "gatsby";
import SectionNavMenu from "../utils/SectionNavMenu"; // Import the new SectionNavMenu component

const Header = ({ siteTitle, currentPage, setCurrentPage, sectionNames }) => { // Accept props
  return (
    <header
      style={{
        margin: `0 auto`,
        padding: `var(--space-4) var(--size-gutter)`,
        display: `flex`,
        flexDirection: "column",
        alignItems: `center`,
        justifyContent: `space-between`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: `none`,
            color: `#e873a0`,
            fontSize: `1.5rem`,
            fontWeight: 600,
          }}
        >
          Las Prendas Hablan
        </Link>
        <img
          alt="Gatsby logo"
          height={50}
          style={{ margin: 0 }}
          src="https://tejer.red/logo.png"
        />
      </div>

      {/* Use SectionNavMenu */}
      <SectionNavMenu
        currentPage={currentPage} // Pass currentPage
        sectionNames={sectionNames} // Pass sectionNames
        onNavigate={setCurrentPage} // Pass setCurrentPage as onNavigate
      />
    </header>
  );
};

export default Header;
