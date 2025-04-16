import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
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
  </header>
)

export default Header
