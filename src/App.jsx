import Router from "./Router/Router.jsx";
import "./App.css";
import { BrowserRouter } from "react-router";
import { message } from "antd";

function App() {
  const [_, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
