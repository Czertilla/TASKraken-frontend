import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Roles } from './pages/roles';
import { NotFound } from './components/Result';

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
          <Route path="/register/:email?" element={<Register/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};