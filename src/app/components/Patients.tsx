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
import { PawPrint, Plus, Search, Edit, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  owner: string;
  ownerPhone: string;
  status: 'Activo' | 'En tratamiento' | 'Inactivo';
  lastVisit: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Max',
    species: 'Perro',
    breed: 'Labrador Retriever',
    age: '3 años',
    owner: 'María García',
    ownerPhone: '321-555-0001',
    status: 'Activo',
    lastVisit: '15/04/2026',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Gato',
    breed: 'Siamés',
    age: '2 años',
    owner: 'Pedro Sánchez',
    ownerPhone: '321-555-0002',
    status: 'Activo',
    lastVisit: '14/04/2026',
  },
  {
    id: '3',
    name: 'Rocky',
    species: 'Perro',
    breed: 'Pastor Alemán',
    age: '5 años',
    owner: 'Ana Martínez',
    ownerPhone: '321-555-0003',
    status: 'En tratamiento',
    lastVisit: '16/04/2026',
  },
  {
    id: '4',
    name: 'Milo',
    species: 'Gato',
    breed: 'Persa',
    age: '4 años',
    owner: 'Carlos López',
    ownerPhone: '321-555-0004',
    status: 'Activo',
    lastVisit: '10/04/2026',
  },
];

export default function Patients() {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Pacientes</h1>
          <p className="text-slate-500">Administra la información de las mascotas</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Mascota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Mascota</DialogTitle>
            </DialogHeader>
            <NewPatientForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Pacientes</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre o propietario..."
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
                <TableHead>Paciente</TableHead>
                <TableHead>Especie/Raza</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <PawPrint className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{patient.species}</div>
                      <div className="text-sm text-slate-500">{patient.breed}</div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.owner}</TableCell>
                  <TableCell>{patient.ownerPhone}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        patient.status === 'Activo'
                          ? 'bg-emerald-100 text-emerald-700'
                          : patient.status === 'En tratamiento'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
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

function NewPatientForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    gender: '',
    color: '',
    weight: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría la data al backend
    console.log('New patient:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Información de la Mascota</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species">Especie *</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, species: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="perro">Perro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
                <SelectItem value="ave">Ave</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed">Raza</Label>
            <Input
              id="breed"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Sexo</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="macho">Macho</SelectItem>
                <SelectItem value="hembra">Hembra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color/Características</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Información del Propietario</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ownerName">Nombre Completo *</Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerPhone">Teléfono *</Label>
            <Input
              id="ownerPhone"
              value={formData.ownerPhone}
              onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="ownerEmail">Email</Label>
            <Input
              id="ownerEmail"
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="ownerAddress">Dirección</Label>
            <Input
              id="ownerAddress"
              value={formData.ownerAddress}
              onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Registrar Paciente
        </Button>
      </div>
    </form>
  );
}
