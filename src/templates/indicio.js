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
      <div style={{height: "100vh"}} className="indicio-template">
        <FormPage 
          csvData={[item]} 
          preselectIndicio={true} 
          formContext={`indicio_${item.INDICIO}`} 
          stepOrder={[3, 2, 1, 4]} 
        />
      </div>
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
