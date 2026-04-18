import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { ProjectsPage } from '../pages/Projects/ProjectsPage';
import { ProjectDetailPage } from '../pages/Projects/ProjectDetailPage';
import { TasksPage } from '../pages/Tasks/TasksPage';
import { UsersPage } from '../pages/Users/UsersPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { PrivateRoute } from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <PrivateRoute><AppLayout /></PrivateRoute>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:projectId', element: <ProjectDetailPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}