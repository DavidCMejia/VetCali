import { NavLink } from "react-router";
import { 
  LayoutDashboard, 
  PawPrint, 
  FileText, 
  Calendar, 
  Users, 
  Building2,
  UserCircle,
  Stethoscope,
  LogIn,
  Building
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      roles: ['veterinario', 'administrador', 'propietario'] 
    },
    { 
      path: "/login", 
      label: "Login / Registro", 
      icon: LogIn, 
      roles: ['veterinario', 'administrador'] 
    },
    { 
      path: "/clinicas", 
      label: "Mis Clínicas", 
      icon: Building, 
      roles: ['veterinario', 'administrador'] 
    },
    { 
      path: "/pacientes", 
      label: "Pacientes", 
      icon: PawPrint, 
      roles: ['veterinario', 'administrador'] 
    },
    { 
      path: "/historias-clinicas", 
      label: "Historias Clínicas", 
      icon: FileText, 
      roles: ['veterinario', 'administrador'] 
    },
    { 
      path: "/citas", 
      label: "Citas", 
      icon: Calendar, 
      roles: ['veterinario', 'administrador'] 
    },
    { 
      path: "/portal-propietarios-simple", 
      label: "Portal Propietarios", 
      icon: UserCircle, 
      roles: ['veterinario', 'administrador', 'propietario'] 
    },
    { 
      path: "/usuarios", 
      label: "Usuarios", 
      icon: Users, 
      roles: ['administrador'] 
    },
    { 
      path: "/organizaciones", 
      label: "Organizaciones", 
      icon: Building2, 
      roles: ['administrador'] 
    },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user?.role || 'veterinario')
  );

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 rounded-lg p-2">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">VetCali</h1>
            <p className="text-xs text-slate-500">Sistema Veterinario</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          {user?.organizationName}
        </div>
      </div>
    </aside>
  );
}