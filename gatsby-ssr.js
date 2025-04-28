import React from "react";

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes, setHeadComponents, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: `en` });
  setHeadComponents([
    <script
      key="gtag-js"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-2G2CDLZCH8"
    />,
    <script
      key="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2G2CDLZCH8');
          console.log('Google Tag Manager loaded');
        `,
      }}
    />,
  ]);
  setPreBodyComponents([
    <noscript
      key="gtm-noscript"
      dangerouslySetInnerHTML={{
        __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNSP7F55"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
      }}
    />,
  ]);
};
