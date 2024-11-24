import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Roles } from './pages/roles';
import { Forbidden, NotFound } from './components/Result';
import { Home } from './pages/home';
import { LoginPage } from './pages/login';
import { VerifyPage } from './pages/verify';

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
          <Route path="/auth/register/:email?" element={<Register/>}/>
          <Route PATH="unauthorized" element={<Forbidden/>}/>
          <Route path="/auth/jwt/login/:email?" element={<LoginPage/>}/>
          <Route path="/auth/verify/:email" element={<VerifyPage/>}/>
          <Route path="/roles" element={<Roles/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};