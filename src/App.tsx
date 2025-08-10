import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ResultList from "./Pages/ResultList";
import Recipe from "./Pages/Recipe";
import Header from "./components/Header";
import Search from "./Pages/Search";
import { useContext, useMemo } from "react";
import { ThemeContext } from "./contexts/contexts";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
  const { theme } = useContext(ThemeContext);


  //ah yes, a ternary in a ternary.  my brain ;-;
  const currentTheme = useMemo(
    () =>
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme,
    [theme]
  );

  return (
    <div className="size-full min-h-screen dark:bg-black dark:text-white" data-theme={currentTheme}>
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
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
