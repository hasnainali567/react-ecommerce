import Router from "./Router/Router.jsx";
import "./App.css";
import { message } from "antd";

function App() {
  const [_, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <Router />
    </>
  );
}

export default App;
