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
      </div>
      <footer
  style={{
    marginTop: '-5px',
    fontSize: 'var(--font-sm)',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.5rem',
    textAlign: 'center',
    padding: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    position: 'fixed',
    bottom: 0,
  }}
>
  <span>{new Date().getFullYear()} <b>Las Prendas Hablan</b> es un proyecto conjunto entre:</span>
  <span>·</span>
  <a href="https://adondevanlosdesaparecidos.org/">A donde van los desaparecidos</a>
  <span>·</span>
  <a href="https://www.zonadocs.mx/">Zona Docs</a>
  <span>·</span>
  <a href="https://animalpolitico.com">Animal Político</a>
  <span>·</span>
  <span>Hospedado por <a href="https://tejer.red">Tejer.Red</a></span>
</footer>
    </>
  );
};

export default Layout;
