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
    path: PRIVATE_ROUTES.LANDOWNER,
    Component: lazy(() => import("@pages/Landowner")),
  },
  {
    path: PRIVATE_ROUTES.BUYER,
    Component: lazy(() => import("@pages/Buyer")),
  },
  {
    path: PRIVATE_ROUTES.CONTACT,
    Component: lazy(() => import("@pages/Contact")),
  },
  {
    path: PRIVATE_ROUTES.MODS,
    Component: lazy(() => import("@pages/Mods")),
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    Component: lazy(() => import("@pages/Settings")),
  },
];
