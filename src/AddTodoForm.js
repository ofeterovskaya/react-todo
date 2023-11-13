import React,{ useState } from 'react';

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
            id: Date.now(),
        });
        //pass title and id
        setTodoTitle("");
    }
    return (
        <form onSubmit = {handleAddTodo}>
            <label htmlFor="todoTitle"> Title </label>
            <input type = "text"
                   placeholder = "New Todo"
                   name = "title" 
                   id = "todoTitle"
                   value = {todoTitle}
                   onChange = {handleTitleChange} />
            <button type ="submit"> Add </button>
        </form>
    );
}

export default AddTodoForm;