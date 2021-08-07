import { ToastContainer } from "react-toastify";
import Routes from "./Routes/Routes";

function App(props) {
  return (
    <div className="app">
      <Routes {...props} />
      <ToastContainer />
    </div>
  );
}

export default App;
