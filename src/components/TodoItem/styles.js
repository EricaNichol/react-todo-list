import style from "@emotion/styled";

export const TodoItemStyles = style.div`
.item {
    text-decoration: ${(props) => (props.isComplete ? "line-through" : "")};
    width: 100%;
    margin: 20px;
}
input:disabled {
    box-shadow: none
}

.button_container {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-right: 20px;
}
`;
