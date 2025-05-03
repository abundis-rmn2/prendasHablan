import * as React from "react";
import { Link } from "gatsby";
import * as styles from "./index.module.css"; // Ensure 'linkText' is exported from this file

const IndicioList = ({ csvData }) => {
  return (
    <>
    <p className={styles.intro}>
    Listado sencillo de prendas encontradas en el Rancho Izaguirre en Teuchitlán, Jalisco.
  </p>
    <ul className={styles.grid}>
      {csvData.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <Link to={`/indicio/${item.INDICIO}`} className={styles.listItemLink}>
            <p className={styles.linkText}>{item.INDICIO}</p>
          </Link>
        </li>
      ))}
    </ul>
    </>
  );
};

export default IndicioList;
