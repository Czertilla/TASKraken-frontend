import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Roles } from './pages/roles';

export const App = () => {

  return (
    <div>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};