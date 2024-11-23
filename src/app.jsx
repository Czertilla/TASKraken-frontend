import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Roles } from './pages/roles';
import { NotFound } from './components/Result';
import { Home } from './pages/home';

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
          <Route path="/" element={<Home/>}/>
          <Route path="/register/:email?" element={<Register/>}/>
          <Route path="/roles" element={<Roles/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};