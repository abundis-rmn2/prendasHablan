import { graphql, useStaticQuery } from "gatsby";

const useLoadCsvData = () => {
  const data = useStaticQuery(graphql`
    query LoadCsvData {
      allCompleteDataCsv {
        nodes {
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
    }
  `);

  return data.allCompleteDataCsv.nodes;
};

export default useLoadCsvData;
