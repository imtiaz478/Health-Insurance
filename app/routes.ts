
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
    route("about", "./routes/about.tsx"),
    route("blogs", "./routes/blogs.tsx"),
    route("contact", "./routes/contact.tsx"),
    route("get-quote", "./routes/get-quote.tsx"),
    route("claim", "./routes/claim.tsx"),
    route("register", "./routes/register.tsx"),
    route("login", "./routes/login.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("payment-receipt/:paymentId", "./routes/payment-receipt.tsx"),
    route("premium-calculator", "./routes/premium-calculator.tsx"),
    route("apply-policy", "./routes/apply-policy.tsx"),
    route("admin/login", "./routes/admin-login.tsx"),
    route("admin/dashboard", "./routes/admin-dashboard.tsx"),
    route("payment/:paymentId", "./routes/payment.tsx"),
    
  ]),
] satisfies RouteConfig;
