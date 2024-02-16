# react-todo
# TodoList App
This is a simple TodoList application built with React. It allows users to add, view, and delete todo items.
This is a React application that uses the Airtable API to manage a todo list. Here's a brief overview of the code:
It contains 2 pages . Welcome Page and Todo List page.  Both of pages has a dynamic background dark blue sky and moving stars.

![background](https://github.com/ofeterovskaya/react-todo/assets/42256431/d9081d98-d2b7-416c-99db-cc9491bf734e)

Welcome page has 80% width and light blue color as a background.There are welcome text , Mode button on the top right corner and Gor to Todo List button. 
![welcome page](https://github.com/ofeterovskaya/react-todo/assets/42256431/54cfb3c3-b36d-45cb-96cc-bb382e3c0c06)
When click on Dark Mode button, backdround changes to dark blue color and text becomes white. Go to Todo List and Mode buttons has a hover effect, the color of the buttons changes if mouse hovered a button. 
Also, there is a Footer section on the bottom of the Welcome Page. It has dark blue background and with text. It consists of my name , copyright sign in the middle  and  social media icons LinkedIn and Github on the right buttom corner. Social media Icons are linked to my linkedIn and Github account to help people to connect with me.
## To do List Page
It is 80% width page with light blue background. It contains 2 buttons on the top. Mode button is on the right top corner, Co back button is on the top left corner. Both of them have a hover effect (color changes when hovering a button). Go back button leads to Welcome Page, Dark mode changes a background color to dark blue and text to white. There is a Welcome text in the top center position which welcomes customer according to a time. Good Morning, Good afternoon or Good evening. 
![TodoList](https://github.com/ofeterovskaya/react-todo/assets/42256431/1d610e05-6540-4ce8-8ca4-75f2926c0405)
Under welcoming message there is a Todo List section with input lable and Add button. When Add button pressed , new item is apperas in the list on the page and in Airtable Databese.  Next under it there is a sort button which sorts from A to Z and Z to A. 
Then added to do list item appears . This section has 3 collumns. 1st collumn is Checkbox. When it pressed, the box marked checked and todo item is crossing out. 
![checkbox](https://github.com/ofeterovskaya/react-todo/assets/42256431/caa35ff1-d480-45e2-981f-19296c38f380)

2nd collumn is todo item , and 3rd collumns is delete button with trash icon, also has a hover effect. When the button pressed, item is deleting from the page and Airtable database.
 On the buttom of the page there is a Footer section as well as in Welcome page 
## Features
- Add new todo items
- View a list of all todo items
- Delete existing todo items
- Greet users based on the time of day
The App function is the main component of the application. It uses several hooks to manage state and side effects.
The useState hook is used to manage the state of the todo list (todoList), the loading state (isLoading), and the dark mode toggle (isDarkMode).
The useCallback hook is used to define functions that fetch, update, and delete todos from the Airtable API. These functions are wrapped in useCallback to prevent unnecessary re-renders.
The useEffect hook is used to fetch the todo list from the Airtable API when the component mounts.
The BrowserRouter, Routes, and Route components from react-router-dom are used to manage routing in the application.
The AddTodoForm, TodoList, Toggle, TodoContainer, and P5Wrapper components are used to build the UI of the application.
The AirtableUrl constant is used to store the base URL of the Airtable API.
The handleToggleChange function is used to toggle the dark mode state.
The fetchData, addTodo, updateData, and deleteTodo functions are used to interact with the Airtable API.
The return statement renders the UI of the application. It uses conditional rendering to display a loading message while the todo list is being fetched. It also uses the react-router-dom components to manage routing.


The app is structured into several components:
TodoContainer: This is the top-level component. It manages the state of the app and contains the main logic.
TodoView: This component receives the app state and callback functions as props from TodoContainer, and passes them down to TodoList.
TodoList: This component receives the todo list and callback functions as props, and maps over the todos to create a TodoListItem for each one.
TodoListItem: This component receives a todo item and callback functions as props, and displays the todo item.
Greeting: This component displays a greeting to the user based on the time of day.

License
This project is licensed under the MIT License.
