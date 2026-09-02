import {
  type RouteConfig,
 
  index,
  layout,
  route,
 
} from "@react-router/dev/routes";

export default [
  


  layout("./layout/MainLayout.tsx", [
    index("./routes/home.tsx"),
    route("health-insurance", "./routes/health-insurance.tsx"),
  ]),

  
] satisfies RouteConfig;
