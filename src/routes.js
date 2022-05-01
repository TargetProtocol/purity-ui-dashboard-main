import {
  CreditIcon,
  HomeIcon,
  StatsIcon,
} from 'components/Icons/Icons';
// import Ramper from "views/Dashboard/Ramper";
import SignIn from 'views/Auth/SignIn.js';
import SignUp from 'views/Auth/SignUp.js';
import Billing from 'views/Dashboard/Billing';
// import
import Dashboard from 'views/Dashboard/Dashboard';
import Tables from 'views/Dashboard/Tables';

var dashRoutes = [
  {
    path: "/dashboard",
    name: "D a s h b o a r d",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/marketplace",
    name: "NFT Market",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/billing",
    name: "Buy Crypto with Card",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    name: "",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/signin",
        name: "",
        rtlName: "لوحة القيادة",
        // icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "",
        rtlName: "لوحة القيادة",
        // icon: <RocketIcon color="inherit" />,
        // secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
  // {
  //   path: "/ramper",
  //   name: "Buy Crypto",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Ramper,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
