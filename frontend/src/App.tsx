import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>Home Page</div>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <div>Search Page</div>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
