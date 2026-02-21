import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskListing from "./pages/tasks/taskListing";

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    
    <Route path='/' element={<TaskListing/>} /></Routes></BrowserRouter>
  )
}

export default App
