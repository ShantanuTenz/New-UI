import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// import SignIn from './components/signin-signup/signin';
// import SignUp from './components/signin-signup/signup';

// const Header = lazy(() => import("./components/header/Header"));
function App() {
  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}

export default App;


    // <Router>
      {/* <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={<Header />}
            />
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
          </Routes>
        </Suspense>
      </div> */}
    // </Router>