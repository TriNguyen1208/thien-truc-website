import { useRoutes } from "react-router-dom";
import { routes } from '@/routes/routes';

export default function RoutesElement() {
  const allRoute = useRoutes(routes);
  return allRoute;
}