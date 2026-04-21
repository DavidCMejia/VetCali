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
import { Building2, Plus, Search, Edit, Users } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface Organization {
  id: string;
  name: string;
  type: 'Clínica' | 'Hospital' | 'Centro Médico';
  city: string;
  address: string;
  phone: string;
  email: string;
  users: number;
  patients: number;
  status: 'Activa' | 'Inactiva';
  createdAt: string;
}

const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Clínica Veterinaria Cali Sur',
    type: 'Clínica',
    city: 'Cali',
    address: 'Calle 5 # 45-32, Sur de Cali',
    phone: '602-555-0001',
    email: 'contacto@vetcalisur.com',
    users: 8,
    patients: 248,
    status: 'Activa',
    createdAt: '15/01/2025',
  },
  {
    id: 'org-2',
    name: 'Hospital Veterinario Norte',
    type: 'Hospital',
    city: 'Cali',
    address: 'Avenida 6N # 25-78, Norte de Cali',
    phone: '602-555-0002',
    email: 'info@hvnorte.com',
    users: 15,
    patients: 512,
    status: 'Activa',
    createdAt: '22/03/2024',
  },
  {
    id: 'org-3',
    name: 'Centro Médico Animal',
    type: 'Centro Médico',
    city: 'Cali',
    address: 'Carrera 100 # 15-20, Oeste de Cali',
    phone: '602-555-0003',
    email: 'contacto@cmanimal.com',
    users: 5,
    patients: 156,
    status: 'Activa',
    createdAt: '10/06/2025',
  },
];

export default function Organizations() {
  const [organizations] = useState<Organization[]>(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Organizaciones</h1>
          <p className="text-slate-500">Administración multi-tenant de clínicas veterinarias</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Organización
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Organización</DialogTitle>
            </DialogHeader>
            <NewOrganizationForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Organizaciones
            </CardTitle>
            <Building2 className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{organizations.length}</div>
            <p className="text-xs text-slate-500 mt-1">Registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Organizaciones Activas
            </CardTitle>
            <Building2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {organizations.filter(o => o.status === 'Activa').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Operando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Usuarios
            </CardTitle>
            <Users className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {organizations.reduce((sum, org) => sum + org.users, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">En todas las organizaciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Pacientes
            </CardTitle>
            <Users className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {organizations.reduce((sum, org) => sum + org.patients, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">Atendidos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Organizaciones</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre o ciudad..."
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
                <TableHead>Organización</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead className="text-center">Usuarios</TableHead>
                <TableHead className="text-center">Pacientes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{org.name}</div>
                        <div className="text-sm text-slate-500">{org.address}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.type}</Badge>
                  </TableCell>
                  <TableCell>{org.city}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{org.phone}</div>
                      <div className="text-sm text-slate-500">{org.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {org.users}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {org.patients}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        org.status === 'Activa'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }
                    >
                      {org.status}
                    </Badge>
                  </TableCell>
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

function NewOrganizationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: 'Cali',
    address: '',
    phone: '',
    email: '',
    adminName: '',
    adminEmail: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New organization:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Información de la Organización</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="name">Nombre de la Organización *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Organización *</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="Clínica, Hospital, Centro Médico..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ciudad *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="address">Dirección *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Administrador Inicial</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="adminName">Nombre Completo *</Label>
            <Input
              id="adminName"
              value={formData.adminName}
              onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">Email *</Label>
            <Input
              id="adminEmail"
              type="email"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas Adicionales</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Crear Organización
        </Button>
      </div>
    </form>
  );
}
