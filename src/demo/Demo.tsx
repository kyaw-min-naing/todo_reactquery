import { useState } from "react";
import { Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos, removeTodo } from "../api";
import TodoCard from "../components/TodoCart";
import "../App.css";

export default function Demo() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const { data: todos = [], isLoading: isFetching } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"],
  });

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onMutate: () => {
      setIsAdding(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsAdding(false);
    },
    onError: () => {
      setIsAdding(false);
    },
  });

  const { mutate: removeTodoMutation } = useMutation({
    mutationFn: removeTodo,
    onMutate: (id) => {
      setRemovingId(id);
    },
    onSuccess: () => {
      setRemovingId(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      setRemovingId(null);
    },
  });

  return (
    <div className="demo-container">
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={() => {
            if (title.trim()) {
              addTodoMutation({ title });
              setTitle("");
            }
          }}
        >
          Add todo
        </button>
      </div>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        todos?.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onRemove={() => removeTodoMutation(todo.id)}
            isRemoving={removingId === todo.id}
          />
        ))
      )}
      {isAdding && <div>Adding...</div>}
    </div>
  );
}
