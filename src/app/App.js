import './App.css';
import { Footer } from '../components/layout/footer/Footer'
import { Header } from "../components/layout/header/Header";
import { Main } from "../components/layout/main/Main";
import { Menu } from '../components/menu/Menu';
import {
  Routes,
  Route,
} from "react-router-dom";
import Register from '../routes/Register';
import CategoryTemplate from '../routes/CategoryTemplate'
import { useSelector } from "react-redux";
import { getGetCategoryList } from '../features/categoryListSlice';
import { RemoveSpaces } from '../utilities/RemoveSpaces';

function App() {
  const selectedCategories = useSelector(getGetCategoryList);

  function createCategoryRoutes() {
    return(
      selectedCategories.map(category => 
        <Route
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
          {createCategoryRoutes()}
      </Routes>
      <Footer />
      <Menu />
    </div>
  );
}

export default App;
