export const PUBLIC_ROUTES = {
	HOME: "",
	NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
  DASHBOARD: "",
  PROJECTINFO: ":pid/*",
  EMPLOYEE: "employee/*",
  EMPLOYEEINFO: "employee/:eid/*",
  TESTIMONIALS: "testimonials",
  MODS: "mods/*",
  SETTINGS: "settings",
  NOTFOUND: "*",
};
