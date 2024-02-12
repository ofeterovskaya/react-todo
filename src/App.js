import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import AddTodoForm from "./components/AddTodoForm";
//import InputWithLabel from "./components/InputWithLabel";
//import TodoList from "./components/TodoList";
//import TodoListItem from "./components/TodoListItem";
//import Toggle from "./components/Toggle";
import TodoContainer from "./components/TodoContainer";
//import styles from "./components/TodoListItem.module.css";
import { P5Wrapper } from "./components/DynamicBackground";
import DynamicBackground from "./components/DynamicBackground";
import HomePage from "./components/HomePage";
//import TodoView from './components/TodoView';
// import Footer from "./components/Footer";


function App() {
//manage the isDarkMode state in App.js and pass it down to the HomePage and TodoContainer components as props.
// So I can avoid using useState and useEffect in the HomePage and TodoContainer components.
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleSwitch = (newMode) => {
    setIsDarkMode(newMode);
  };
  return (
    <BrowserRouter>
     {/* Dynamic background added here to be visible on every page */}
    <P5Wrapper sketch={DynamicBackground} />
      <Routes>
      <Route 
        path="/" element={
          <HomePage
             isDarkMode={isDarkMode}
             handleSwitch={handleSwitch}
          />} 
      />
      <Route 
        path="/todolist" element={
          <TodoContainer
            isDarkMode={isDarkMode}
            handleSwitch={handleSwitch}
          />}
      />
       
      </Routes>
    </BrowserRouter>
  );
  
}


export default App;
