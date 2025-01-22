import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo from "./demo/Demo";
import { useState } from "react";
import { Button } from "antd";

const queryClient = new QueryClient();

function App() {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <Button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</Button>
      {showDemo && <Demo />}
    </QueryClientProvider>
  );
}

export default App;
