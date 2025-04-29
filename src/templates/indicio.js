import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags
import Layout from "../components/layout";
import FormPage from "../components/FormPage"; // Replace FormComponent with FormPage
import ShareButtons from "../components/ShareButtons"; // Import ShareButtons

const IndicioTemplate = ({ data }) => {
  const item = data.completeDataCsv;
  const imageUrl = `https://rancho-izaguirre.abundis.com.mx/indicios/${item.id}.jpg`;

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
      <div className="indicio-template">
        <h1>Identificador Único de Indicio: {item.INDICIO}</h1>
        <p><b>Tipo de indicio:</b> {item.TIPO_DE_INDICIO}</p>
        <p><b>Color:</b> {item.COLOR}</p>
        <p><b>Marca:</b> {item.MARCA}</p>
        <p><b>Talla:</b> {item.TALLA}</p>
        <p><b>Observaciones:</b> {item.OBSERVACIONES}</p>
        <img src={imageUrl} alt={item.INDICIO} style={{ maxWidth: "100%", height: "auto", maxHeight: "23rem" }} />
        <ShareButtons indicio={item.INDICIO} />
      </div>
      <FormPage csvData={[item]} /> {/* Pass csvData to FormPage */}
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
