import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import TodoListPage from "../pages/TodosListPage";

// Each route can define a "loader" function to provide
// data to the route element before it renders.
// Demonstrate the ability to use react router hooks.
// Alternative would be the Delivery Context

export const HTTP_ROUTES = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/todos",
        element: <TodoListPage />,
      },
      {
        path: "/todos/:date",
        element: <TodoListPage />,
        loader: async ({ params }) => {
          const date = params.date;
          return date;
        },
      },
    ],
  },
];
