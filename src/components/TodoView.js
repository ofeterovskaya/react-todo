import PropTypes from "prop-types";
import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import styles from "./SharedStyles.module.css";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";
import Toggle from "./Toggle";
import Footer from "./Footer";
import GoBack from "./GoBack";

const TodoView = ({
  onAddTodo,
  fetchData,
  updateData,
  removeTodo,
  isLoading,
  todoList,
  sortOrder,
  handleSortToggle,
  isDarkMode,
  handleSwitch,
}) => {
  if (isLoading) {
    return <p className={styles.Loading}> Loading...</p>;
  }
  return (
    <>
      <div
        className={`${styles.HomePage} ${
          isDarkMode ? styles.DarkModeHomePage : styles.LightModeHomePage
        }`}
      >
        <div className={styles.topButtonContainer}>
          <GoBack />
          <Toggle
            className={`${
              isDarkMode
                ? styles.darkThemeModeButton
                : styles.lightThemeModeButton
            }`}
            isDarkMode={isDarkMode}
            onSwitch={handleSwitch}
          />
        </div>
        <div className={styles.Text}>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={onAddTodo} isDarkMode={isDarkMode} />

          <div className={styles.SortButtonContainer}>
            <button
              type="button"
              className={styles.SortButton}
              onClick={handleSortToggle}
            >
              {sortOrder === "asc" ? (
                <>
                  {" "}
                  <FaSortAlphaUpAlt /> Sort Z-A{" "}
                </>
              ) : (
                <>
                  {" "}
                  <FaSortAlphaDown /> Sort A-Z{" "}
                </>
              )}
            </button>
          </div>
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            updateData={updateData}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

TodoView.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  handleSortToggle: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default TodoView;
