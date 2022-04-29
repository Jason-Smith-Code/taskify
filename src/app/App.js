import './App.css';

import { Footer } from '../components/layout/footer/Footer'
import { Header } from "../components/layout/header/Header";
import { Main } from "../components/layout/main/Main";
import { Menu } from '../components/menu/Menu';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      <Menu />
    </div>
  );
}

export default App;
