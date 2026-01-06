import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Login from './pages/login/index.tsx';
// import Dashboard from './pages/dashboard/index.tsx';
import { ProtectedLayout, ProtectedRoute } from './pages/protectedRoute/index.tsx';


const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    Loading...
  </div>
);
const App: React.FC = () =>{
const Login = lazy(() => import('./pages/login/index.tsx'));
const Dashboard = lazy(() => import('./pages/dashboard/index.tsx'));

  return (
    <BrowserRouter>
     <Suspense fallback={<PageLoader />}>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         

        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App; 
