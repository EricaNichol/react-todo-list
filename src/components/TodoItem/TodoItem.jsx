import { useState } from "react";
import { TodoItemStyles } from "./styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { TextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ListItem from "@mui/material/ListItem";

const TodoItem = ({
  isComplete,
  task,
  date,
  index,
  deleteTodoItem,
  completeTodoItem,
  updateTodoItem,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemDate, setItemDate] = useState(moment(date).format("YYYY-MM-DD"));
  const [inputValue, setInputValue] = useState(task);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditMode((prev) => !prev);
  };

  const handleUpdateClick = (e) => {
    let onUpdate = updateTodoItem(inputValue, itemDate, index);
    if (onUpdate) {
      setIsEditMode((prev) => !prev);
    }
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    setInputValue(value);
  };

  const displayActionButtons = () => {
    return (
      <div className="button_container">
        {/* Date opicker */}
        {isEditMode && (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Task Date"
              value={itemDate}
              onChange={(newValue) => {
                let date = moment(newValue).format("YYYY-MM-DD");
                setItemDate(date);
              }}
              minDate={itemDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
        {/* Complete  */}
        <Fab
          onClick={() => {
            completeTodoItem(index);
          }}
          size="small"
          color="secondary"
          aria-label="complete task"
        >
          <TaskAltIcon />
        </Fab>
        {/* Edit, Complete Edit */}
        {!isEditMode && (
          <Fab
            onClick={handleEditClick}
            size="small"
            color="secondary"
            aria-label="edit"
          >
            <EditIcon />
          </Fab>
        )}
        {isEditMode && (
          <Fab
            onClick={handleUpdateClick}
            size="small"
            color="secondary"
            aria-label="complete edit"
          >
            <CheckIcon />
          </Fab>
        )}
        {/* Delete */}
        <Fab
          onClick={() => {
            deleteTodoItem(index);
          }}
          size="small"
          color="secondary"
          aria-label="delete"
        >
          <DeleteForeverIcon />
        </Fab>
      </div>
    );
  };

  return (
    <TodoItemStyles isComplete={isComplete}>
      <TextField
        onChange={handleOnChange}
        disabled={!isEditMode}
        value={inputValue}
        className="item"
        helperText={itemDate}
        variant="standard"
      />
      {displayActionButtons()}
    </TodoItemStyles>
  );
};
export default TodoItem;

// {
//   [0, 1, 2, 3].map((value) => {
//     const labelId = `checkbox-list-label-${value}`;

//     return (

//         <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
//           <ListItemIcon>
//             <Checkbox
//               edge="start"
//               checked={checked.indexOf(value) !== -1}
//               tabIndex={-1}
//               disableRipple
//               inputProps={{ "aria-labelledby": labelId }}
//             />
//           </ListItemIcon>
//           <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//         </ListItemButton>
//       </ListItem>
//     );
//   });
// }
