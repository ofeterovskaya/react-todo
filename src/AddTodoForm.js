import {useState, useEffect, useRef} from 'react';
import InputWithLabel from "./InputWithLabel";

function AddTodoForm ({onAddTodo}) {
    //create
    const [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange (event) {
        const newTodoTitle = event.target.value;
        //update
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo (event) {        
        event.preventDefault();
        onAddTodo ({
            title: todoTitle,
            //generate a unique number
            // id: Date.now(),
        });
        //pass title and id
        setTodoTitle("");
    }
    return (
        <form onSubmit = {handleAddTodo}>
            
            <InputWithLabel
                type = "text"
                // placeholder = "New Todo"
                name = "title" 
                id = "todoTitle"
                value = {todoTitle}
                onChange = {handleTitleChange}
                autoFocus
            >
                Title                    
            </InputWithLabel> 
            &nbsp;
            <button type ="submit"> Add </button>
        </form>
    );
}

export default AddTodoForm;