import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo from "./demo/Demo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Demo />
    </QueryClientProvider>
  );
}

export default App;
