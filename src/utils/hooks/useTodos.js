import { useEffect, useState } from "react";
import moment from "moment";

export default function useTodos() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    let localTodos = fetchTodos("allTodos");
    if (localTodos) setTodoItems(localTodos);
  }, []);

  const fetchTodos = (key) => {
    const storedTodos = localStorage.getItem(key);
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
  };

  const storeTodos = (todos) => {
    localStorage.setItem("allTodos", JSON.stringify(todos));
  };

  const createTodoItem = (input, inputDate) => {
    if (input.length < 3)
      return alert("Please put in a task thats more than 3 letters");
    const id = todoItems.length + 1;
    let dateValue = moment(inputDate).format("YYYY-MM-DD");
    const payLoad = {
      id: id,
      task: input,
      isComplete: false,
      date: dateValue,
    };

    setTodoItems((prev) => {
      let newList = [...prev, payLoad];
      storeTodos(newList);

      return newList;
    });
  };

  const updateTodoItem = (inputValue, itemDate, index) => {
    const newTodoItems = [...todoItems];
    const item = newTodoItems[index];
    let updatedValue = {
      ...item,
      task: inputValue,
      date: itemDate,
    };

    newTodoItems.splice(index, 1, updatedValue);
    if (inputValue.length <= 3) {
      alert("Not long enough");
      return false;
    } else {
      setTodoItems((prev) => {
        let newList = newTodoItems;
        storeTodos(newList);

        return newList;
      });
      return true;
    }
  };

  const deleteTodoItem = (index) => {
    setTodoItems((prev) => {
      const newTodoItems = [...prev];
      newTodoItems.splice(index, 1);
      storeTodos(newTodoItems);

      return newTodoItems;
    });
  };

  const completeTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].isComplete === false
      ? (newTodoItems[index].isComplete = true)
      : (newTodoItems[index].isComplete = false);

    setTodoItems((prev) => {
      let newList = newTodoItems;
      storeTodos(newList);

      return newList;
    });
  };

  const formatDataToObj = (todoObj) => {
    return todoObj.reduce((next, curr) => {
      let date = curr["date"];

      if (!next[date]) {
        return {
          ...next,
          [date]: [curr],
        };
      } else {
        return {
          ...next,
          [date]: [...next[date], curr],
        };
      }
    }, {});
  };

  return {
    todoItems,
    storeTodos,
    deleteTodoItem,
    createTodoItem,
    updateTodoItem,
    completeTodoItem,
    formatDataToObj,
  };
}
