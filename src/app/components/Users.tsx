import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Users as UsersIcon, Plus, Search, Edit, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Veterinario' | 'Administrador' | 'Recepcionista';
  organization: string;
  status: 'Activo' | 'Inactivo';
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Carlos Mendoza',
    email: 'cmendoza@vetcali.com',
    role: 'Veterinario',
    organization: 'Clínica Veterinaria Cali Sur',
    status: 'Activo',
    lastLogin: '17/04/2026 08:30',
  },
  {
    id: '2',
    name: 'Dra. Laura Ramírez',
    email: 'lramirez@vetcali.com',
    role: 'Veterinario',
    organization: 'Clínica Veterinaria Cali Sur',
    status: 'Activo',
    lastLogin: '17/04/2026 09:15',
  },
  {
    id: '3',
    name: 'Ana María López',
    email: 'alopez@vetcali.com',
    role: 'Administrador',
    organization: 'Clínica Veterinaria Cali Sur',
    status: 'Activo',
    lastLogin: '17/04/2026 07:45',
  },
  {
    id: '4',
    name: 'Patricia Gómez',
    email: 'pgomez@vetcali.com',
    role: 'Recepcionista',
    organization: 'Clínica Veterinaria Cali Sur',
    status: 'Activo',
    lastLogin: '16/04/2026 18:00',
  },
];

export default function Users() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h1>
          <p className="text-slate-500">Control de acceso y permisos del sistema</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            </DialogHeader>
            <NewUserForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Usuarios
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{users.length}</div>
            <p className="text-xs text-slate-500 mt-1">Registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Usuarios Activos
            </CardTitle>
            <Shield className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {users.filter(u => u.status === 'Activo').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Conectados hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Veterinarios
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {users.filter(u => u.role === 'Veterinario').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">En la plataforma</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Usuarios</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Organización</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-emerald-700">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === 'Veterinario'
                          ? 'border-blue-200 text-blue-700'
                          : user.role === 'Administrador'
                          ? 'border-purple-200 text-purple-700'
                          : 'border-slate-200 text-slate-700'
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{user.organization}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        user.status === 'Activo'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function NewUserForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    organization: '',
    phone: '',
    licenseNumber: '',
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New user:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="name">Nombre Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Rol *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rol..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="veterinario">Veterinario</SelectItem>
              <SelectItem value="administrador">Administrador</SelectItem>
              <SelectItem value="recepcionista">Recepcionista</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organización *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, organization: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar organización..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="org-1">Clínica Veterinaria Cali Sur</SelectItem>
              <SelectItem value="org-2">Hospital Veterinario Norte</SelectItem>
              <SelectItem value="org-3">Centro Médico Animal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="licenseNumber">Número de Licencia Profesional</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            placeholder="Solo para veterinarios"
          />
        </div>

        <div className="space-y-2 col-span-2">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <Label htmlFor="isActive" className="cursor-pointer">Usuario Activo</Label>
              <p className="text-sm text-slate-500">El usuario puede acceder al sistema</p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Crear Usuario
        </Button>
      </div>
    </form>
  );
}
