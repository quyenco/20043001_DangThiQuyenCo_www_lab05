import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import JobDetail from "./jobDetail/JobDetail";
import PostJob from "./postJob/PostJob";
import UpdateCompany from "./update/UpdateCompany";
import UpdateCandidate from "./update/UpdateCandidate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/job-detail" element={<JobDetail />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/updateCompany" element={<UpdateCompany />} />
        <Route path="/updateCandidate" element={<UpdateCandidate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
