import Header from "./components/header";
import "./css/index.css";
import "antd/dist/antd.css";
import TableView from "./components/table";
import DemoContent from "./components/content";
import Graph from "./components/graph";
function App() {
  return (
    <div>
      <Header />
      <DemoContent />
      <TableView />
      <Graph />
    </div>
  );
}

export default App;
