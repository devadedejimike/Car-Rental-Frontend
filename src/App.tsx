import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;