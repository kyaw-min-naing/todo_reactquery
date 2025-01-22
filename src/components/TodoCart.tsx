import { useState } from "react";
import { Todo } from "../entities/Todo";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface TodoProps {
  todo: Todo;
  removeTodoMutation: (id: number) => void;
}

export default function TodoCard({ todo, removeTodoMutation }: TodoProps) {
  const [checked, setChecked] = useState(todo.completed);

  return (
    <div>
      {todo.title}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        size="small"
        onClick={() => removeTodoMutation(todo.id)}
      ></Button>
    </div>
  );
}
