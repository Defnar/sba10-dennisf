import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home";
import ResultList from "./Pages/ResultList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/region/:region"
          element={<ResultList listType="region" />}
        />
        <Route
          path="/category/:category"
          element={<ResultList listType="category" />}
        />
      </Routes>
    </>
  );
}

export default App;
