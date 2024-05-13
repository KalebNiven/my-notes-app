import { Navigate, Outlet } from 'react-router-dom'
export const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
  const isAuthorized = token ?? false;
return (
  isAuthorized ? <Outlet/> : <Navigate to='/signin'/>
  )
}