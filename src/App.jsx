import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Builder from "./components/Builder";
import BuyMeACoffee from "./components/BuyMeACoffee";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <BuyMeACoffee />
            </>
          }
        />
        <Route path="/builder" element={<Builder />} />
        {/* <Route path="/buy-me-a-coffee" element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
