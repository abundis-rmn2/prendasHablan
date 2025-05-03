/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, pageType, currentPage, setCurrentPage, sectionNames }) => { // Accept props
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        currentPage={currentPage} // Pass currentPage
        setCurrentPage={setCurrentPage} // Pass setCurrentPage
        sectionNames={sectionNames} // Pass sectionNames
      />
      <div 
        className={`container page-${pageType}`} // Add dynamic className
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot; <b>Las Prendas Hablan</b> es un proyecto conjunto entre:
          <br />
          <a href="https://adondevanlosdesaparecidos.org/">A donde van los desaparecidos</a>
          <br />
          <a href="https://www.zonadocs.mx/">Zona Docs</a>
          <br />
          <a href="https://animalpolitico.com">Animal Politico</a>
          <br />
          Hospedado por
          {` `}
          <a href="https://tejer.red">Tejer.Red</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
