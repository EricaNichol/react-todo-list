import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTodos from "../../utils/hooks/useTodos";

export default function SideNav() {
  const { todoItems, formatDataToObj } = useTodos();
  const [todoList, setTodoList] = useState({});

  useEffect(() => {
    if (todoItems) setTodoList(formatDataToObj(todoItems));
  }, [todoItems]);

  const displayTodoNavs = () => {
    let list = [];

    if (Object.keys(todoList).length > 0) {
      for (let date in todoList) {
        list.push(
          <Link key={date} to={`/todos/${date}`}>
            {date}
          </Link>
        );
      }
    }

    return list;
  };

  return (
    <div id="sidebar">
      <nav>
        <h1>My To-Do's by Dates</h1>
        <ul>
          <li>
            <Link to={`/todos`}>All</Link>
            {todoList && displayTodoNavs()}
          </li>
        </ul>
      </nav>
    </div>
  );
}
