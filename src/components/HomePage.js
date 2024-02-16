import React from "react";
import styles from "./SharedStyles.module.css";
import Toggle from "./Toggle";
import Footer from "./Footer";
//import toggleStyles from "./Toggle.module.css";
import { useNavigate } from "react-router-dom";


const HomePage = ({ isDarkMode, handleSwitch }) => {
  //Switching between dark and light mode isDarkMode, handleSwitch

  //for go to TodoList button
  const navigate = useNavigate();
  const goToTodoList = () => {
    navigate("/todolist");
  };

  return (
    <>
      <div
        className={`${styles.HomePage} ${
          isDarkMode ? styles.DarkModeHomePage : styles.LightModeHomePage
        }`}
      >
        <Toggle 
          className={`${isDarkMode ? styles.darkThemeModeButton : styles.lightThemeModeButton}`}
          isDarkMode={isDarkMode} 
          onSwitch={handleSwitch} 
        />        
        <div className={styles.Text}>
          <h1>Welcome to Todo App!</h1>
          <p>
            The app is designed to help you manage your tasks efficiently and
            effectively.
          </p>
          <br />
          <p>
            I hope that our app makes your life a little bit easier and your
            days more organized. Enjoy using Todo App!
          </p>
        </div>
        <br />
        <div className = {styles.GoToTodoListButtonContainer}>
          <button
            className={`${styles.GoToTodoListButton} ${
              isDarkMode
                ? styles.darkThemeGoToTodoListButton
                : styles.lightThemeGoToTodoListButton
            }`}
            onClick={goToTodoList}
          >
            Go to TodoList
          </button>
         </div> 
       
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
