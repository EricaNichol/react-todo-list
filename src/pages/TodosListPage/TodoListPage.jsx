import { TextField, Button } from "@mui/material";
import { TodoListPageStyles } from "./styles";
import { useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import TodoItem from "../../components/TodoItem";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import useTodos from "../../utils/hooks/useTodos";
import { useLoaderData } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";

export default function TodoListPage({}) {
  const DATE_PARAM = useLoaderData(); // happens before render
  const [input, setInput] = useState("");
  const [inputDate, setInputDate] = useState(moment().format("YYYY-MM-DD"));
  const [list, setList] = useState([]);
  const today = new Date();

  const {
    todoItems,
    deleteTodoItem,
    createTodoItem,
    updateTodoItem,
    completeTodoItem,
  } = useTodos();

  useEffect(() => {
    let dayList = todoItems.filter((item) => item.date === DATE_PARAM);

    if (dayList) {
      // Individual date
      setList(dayList);
    }

    if (!DATE_PARAM) setList(todoItems);
  }, [todoItems, DATE_PARAM]);

  const handleChange = (e) => {
    let value = e.target.value;

    setInput(value);
  };

  const displayTodoList = () => {
    return list.map((item, index) => {
      return (
        <TodoItem
          deleteTodoItem={deleteTodoItem}
          completeTodoItem={completeTodoItem}
          updateTodoItem={updateTodoItem}
          index={index}
          {...item}
          key={item.id}
        />
      );
    });
  };

  return (
    <>
      {/* I had to put this side nav here for dynamic rendering */}
      <SideNav item={list} />
      <div className="details">
        <TodoListPageStyles>
          <h1>Todo List</h1>
          <TextField
            value={input}
            id="outlined-basic"
            label="Add Todo Item"
            variant="outlined"
            placeholder="Add Todo Item"
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Task Date"
              value={inputDate}
              onChange={(newValue) => {
                setInputDate(newValue);
              }}
              minDate={today}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Fab
            onClick={() => createTodoItem(input, inputDate)}
            variant="text"
            size="small"
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <List sx={{ width: "100%" }}>
            <ul>{todoItems && displayTodoList()}</ul>
          </List>
        </TodoListPageStyles>
      </div>
    </>
  );
}
