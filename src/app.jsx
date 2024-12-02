import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/register';
import { Roles } from './pages/roles';
import { Forbidden, NotFound, InternalError } from './components/Result';
import { Home } from './pages/home';
import { LoginPage } from './pages/login';
import { VerifyPage } from './pages/verify';
import { Hud } from './components/Hud';
import { StructRegist } from './pages/struct-regist';

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
          <Route path="/struct/regist" element={<StructRegist/>}/>
          <Route path="/hud" element={<Hud/>}/>
          <Route path="/internal" element={<InternalError/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};