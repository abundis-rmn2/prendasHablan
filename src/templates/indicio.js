import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags
import Layout from "../components/layout";
import FormPage from "../components/FormPage"; // Replace FormComponent with FormPage
import ShareButtons from "../components/ShareButtons"; // Import ShareButtons
import isMobile from "../utils/IsMobile"; // Import isMobile utility

const IndicioTemplate = ({ data }) => {
  const isBrowser = typeof window !== "undefined"; // Check for browser environment
  const item = data.completeDataCsv;
  const imageUrl = `https://rancho-izaguirre.abundis.com.mx/indicios/${item.id}.jpg`;

  React.useEffect(() => {
    if (isMobile()) {
      alert("You are using a mobile device.");
    } else {
      alert("You are not using a mobile device.");
    }
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{`Las Prendas Hablan - Tejer.RED | Indicio: ${item.INDICIO}`}</title>
        <meta name="description" content={`Información sobre el indicio ${item.INDICIO}, tipo: ${item.TIPO_DE_INDICIO}, color: ${item.COLOR}, marca: ${item.MARCA}.`} />
        <meta property="og:title" content={`Indicio: ${item.INDICIO}`} />
        <meta property="og:description" content={`Información sobre el indicio ${item.INDICIO}, tipo: ${item.TIPO_DE_INDICIO}, color: ${item.COLOR}, marca: ${item.MARCA}.`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://rancho-izaguirre.abundis.com.mx/indicios/${item.id}`} />
      </Helmet>
      <style>{`
        ${!isBrowser ? 'html { overflow: scroll !important; }' : ''}
        ${isMobile() ? 'html { overflow: scroll !important; }' : ''}
      `}</style>

      <div className="static-content" style={{ 
        display: isBrowser ? 'none' : 'block',
        padding: "20px", margin: "0 auto", maxWidth: "800px", marginTop: "5rem" }}>
        {item.id && <img style={{ width: "128px" }} src={imageUrl} alt={item.INDICIO} className="indicio-image" />}
        <h4>{`Indicio: ${item.INDICIO}`}</h4>
        <ul>
          <li><strong>Tipo:</strong> {item.TIPO_DE_INDICIO}</li>
          <li><strong>Color:</strong> {item.COLOR}</li>
          <li><strong>Marca:</strong> {item.MARCA}</li>
          <li><strong>Talla:</strong> {item.TALLA}</li>
          <li><strong>Observaciones:</strong> {item.OBSERVACIONES}</li>
          <li><strong>Link Foto:</strong> {item.LINK_FOTO}</li>
        </ul>
        <p>Este indicio forma parte del proyecto "Las Prendas Hablan", una colaboración entre <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a>, <a href="https://www.zonadocs.mx/">ZonaDocs</a> y <a href="https://tejer.red">Tejer Red</a>. Buscamos identificar prendas localizadas en el Rancho Izaguirre (Teuchitlán, Jalisco) que puedan coincidir con las de personas desaparecidas, como parte de una investigación sobre el circuito de desaparición y reclutamiento forzado.</p>
        <p>Si reconoces este indicio o tienes información relacionada, escríbenos a lasprendashablan@gmail.com para reportarlo. Tu aportación puede ayudar a que más personas regresen a casa.</p>
        <ShareButtons 
        indicio={item.INDICIO}>
        </ShareButtons>
      </div>
      {isBrowser && (
              <div style={{ height: "100vh", display: isBrowser ? 'block' : 'none' }} className="indicio-template">
              <FormPage 
                csvData={[item]} 
                preselectIndicio={true} 
                formContext={`indicio_${item.INDICIO}`} 
                stepOrder={[3, 2, 1, 4]} 
              />
            </div>
      )}
    </Layout>
  );
};

export const query = graphql`
  query($INDICIO: String!) {
    completeDataCsv(INDICIO: { eq: $INDICIO }) {
      id
      INDICIO
      TIPO_DE_INDICIO
      COLOR
      MARCA
      TALLA
      OBSERVACIONES
      LINK_FOTO
      hyperlink
    }
  }
`;

export default IndicioTemplate;
