import { Navigate, Outlet } from 'react-router-dom'
export const GuestRoutes = () => {
    const token = localStorage.getItem('token');
  const isAuthorized = token ?? false;
return (
  isAuthorized ? <Navigate to='/'/> :  <Outlet/>

  )
}