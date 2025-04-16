import * as React from "react";
import Layout from "../components/layout";
import IndicioList from "../components/IndicioList";
import FormComponent from "../components/FormComponent";
import useLoadCsvData from "../utils/useLoadCsvData"; // Importar el hook
import * as styles from "../components/index.module.css";

const IndexPage = () => {
  const csvData = useLoadCsvData(); // Usar el hook para cargar los datos del CSV

  return (
    <Layout>
      <div className={styles.textCenter}>
        <h1>Las Prendas Hablan</h1>
      </div>
      {/* <IndicioList csvData={csvData} />   */}
      <FormComponent csvData={csvData} />
    </Layout>
  );
};

export default IndexPage;
