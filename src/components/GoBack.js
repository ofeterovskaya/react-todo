import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SharedStyles.module.css";

function GoBack() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles.GoBackButton} onClick={goBack}>
      Go Back
    </button>
  );
}

export default GoBack;
