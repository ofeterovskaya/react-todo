import React from "react";

function TodoListItem(props) {
    return(
        <li>{props.item.title}{props.complete}</li>
    );
};
export default TodoListItem;