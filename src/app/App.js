import './App.css';
import { Footer } from '../components/layout/footer/Footer'
import { Header } from "../components/layout/header/Header";
import { Main } from "../components/layout/main/Main";
import { Menu } from '../components/menu/Menu';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Register } from '../routes/Register';
import CategoryTemplate from '../routes/CategoryTemplate'
import { useSelector } from "react-redux";
import { getCategoryList } from '../features/categoryListSlice';
import { RemoveSpaces } from '../utilities/RemoveSpaces';
import { Guide } from '../routes/Guide';

function App() {
  const selectedCategories = useSelector(getCategoryList);
  function createCategoryRoutes() {
    return(
      selectedCategories.map(category => 
        <Route
          key={category.id} 
          path={`/${RemoveSpaces(category.title)}`} 
          element={
          <CategoryTemplate
            title={category.title} 
            key={category.id} 
            id={category.id}
          />}
        />
      )
    )
  }

  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="guide" element={<Guide />} />
          {createCategoryRoutes()}
      </Routes>
      <Footer />
      <Menu />
    </div>
  );
}

export default App;
