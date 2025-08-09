import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ResultList from "./Pages/ResultList";
import Recipe from "./Pages/Recipe";
import Header from "./components/Header";
import Search from "./Pages/Search";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/region/:region"
          element={<ResultList listType="region" />}
        />
        <Route
          path="/category/:category"
          element={<ResultList listType="category" />}
        />
        <Route path="/recipe/:idMeal" element={<Recipe />} />
        <Route path="/search/" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
