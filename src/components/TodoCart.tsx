import { useState } from "react";
import { Todo } from "../entities/Todo";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface TodoProps {
  todo: Todo;
  onRemove: () => void;
  isRemoving: boolean;
}

export default function TodoCard({ todo, onRemove, isRemoving }: TodoProps) {
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
        onClick={onRemove}
        disabled={isRemoving}
      >
        {isRemoving ? <Spin size="small" /> : "Remove"}
      </Button>
    </div>
  );
}
