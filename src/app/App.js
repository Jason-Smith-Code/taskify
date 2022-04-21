import './App.css';

import { Footer } from '../components/layout/footer/Footer'
import { Header } from "../components/layout/header/Header";
import { Main } from "../components/layout/main/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
