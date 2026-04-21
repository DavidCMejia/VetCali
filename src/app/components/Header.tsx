import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Header() {
  const { user, switchRole } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div>
        <h2 className="font-semibold text-slate-900">
          Bienvenido, {user?.name}
        </h2>
        <p className="text-sm text-slate-500">
          {user?.role === 'veterinario' && 'Médico Veterinario'}
          {user?.role === 'administrador' && 'Administrador del Sistema'}
          {user?.role === 'propietario' && 'Propietario de Mascota'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-700">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal text-slate-500">
              Cambiar Vista (Demo)
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => switchRole('veterinario')}>
              Vista Veterinario
              {user?.role === 'veterinario' && (
                <Badge variant="secondary" className="ml-auto">Activo</Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole('administrador')}>
              Vista Administrador
              {user?.role === 'administrador' && (
                <Badge variant="secondary" className="ml-auto">Activo</Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole('propietario')}>
              Vista Propietario
              {user?.role === 'propietario' && (
                <Badge variant="secondary" className="ml-auto">Activo</Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
