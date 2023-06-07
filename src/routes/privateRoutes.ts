import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEE,
    Component: lazy(() => import("@pages/Employee")),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEEINFO,
    Component: lazy(() => import("@pages/EmployeeInfo")),
  },
  {
    path: PRIVATE_ROUTES.PROJECTINFO,
    Component: lazy(() => import("@pages/ProjectInfo")),
  },
  {
    path: PRIVATE_ROUTES.TESTIMONIALS,
    Component: lazy(() => import("@pages/Testimonials")),
  },
  {
    path: PRIVATE_ROUTES.MODS,
    Component: lazy(() => import("@pages/Mods")),
  },
];
