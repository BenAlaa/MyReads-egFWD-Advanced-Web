import { ToastContainer } from "react-toastify";
import AppBar from './Components/AppBar/AppBar';
import Routes from "./Routes/Routes";

function App(props) {
  return (
    <div className="app">
      <AppBar />
      <Routes {...props} />
      <ToastContainer />
    </div>
  );
}

export default App;
