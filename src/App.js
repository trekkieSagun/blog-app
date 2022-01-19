import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouting } from "./components/App.routing";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouting />
    </BrowserRouter>
  );
};

export default App;
