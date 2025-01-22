import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos, removeTodo } from "../api";
import TodoCard from "../components/TodoCart";
import { useState } from "react";

export default function Demo() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"],
  });

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: removeTodoaMutation } = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={() => {
            try {
              addTodoMutation({ title });
              setTitle("");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Add todo
        </button>
      </div>
      {todos?.map((todo) => {
        return (
          <TodoCard
            key={todo.id}
            todo={todo}
            removeTodoMutation={removeTodoaMutation}
          />
        );
      })}
    </div>
  );
}
