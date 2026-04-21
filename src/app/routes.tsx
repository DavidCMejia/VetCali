import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import MedicalRecords from "./components/MedicalRecords";
import Appointments from "./components/Appointments";
import OwnerPortalSimple from "./components/OwnerPortalSimple";
import Users from "./components/Users";
import Organizations from "./components/Organizations";
import OwnerPortal from "./components/OwnerPortal";
import Login from "./components/Login";
import ClinicSelector from "./components/ClinicSelector";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "login", Component: Login },
      { path: "clinicas", Component: ClinicSelector },
      { path: "pacientes", Component: Patients },
      { path: "historias-clinicas", Component: MedicalRecords },
      { path: "citas", Component: Appointments },
      { path: "portal-propietarios-simple", Component: OwnerPortalSimple },
      { path: "usuarios", Component: Users },
      { path: "organizaciones", Component: Organizations },
      { path: "portal-propietarios", Component: OwnerPortal },
      { path: "*", Component: NotFound },
    ],
  },
]);