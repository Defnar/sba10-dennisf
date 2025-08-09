import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ResultList from "./Pages/ResultList";
import Recipe from "./Pages/Recipe";
import Header from "./components/Header";
import Search from "./Pages/Search";
import { useContext } from "react";
import { ThemeContext } from "./contexts/contexts";

function App() {

  const {theme} = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
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
        <Route
          path="/list/:letter"
          element={<ResultList listType="letter" />}
        />
        <Route path="/recipe/:idMeal" element={<Recipe />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/random" element={<Recipe isRandom={true} />} />
      </Routes>
    </div>
  );
}

export default App;
