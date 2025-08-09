import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home";
import ResultList from "./Pages/ResultList";
import Recipe from "./Pages/Recipe";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Header/>
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
        <Route
        path="/recipe/:idMeal"
        element={<Recipe />} />
      </Routes>
    </>
  );
}

export default App;
