import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./providers/AppProvider";
import { Routes } from "./routes/routes";

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </AppProvider>
);

export default App;
