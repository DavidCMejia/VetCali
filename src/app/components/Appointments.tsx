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
import { Calendar, Plus, Clock, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  owner: string;
  type: string;
  veterinarian: string;
  status: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: '2026-04-17',
    time: '09:00',
    patientName: 'Max',
    owner: 'María García',
    type: 'Consulta General',
    veterinarian: 'Dr. Carlos Mendoza',
    status: 'Confirmada',
  },
  {
    id: '2',
    date: '2026-04-17',
    time: '10:30',
    patientName: 'Luna',
    owner: 'Pedro Sánchez',
    type: 'Vacunación',
    veterinarian: 'Dra. Laura Ramírez',
    status: 'Pendiente',
  },
  {
    id: '3',
    date: '2026-04-17',
    time: '11:00',
    patientName: 'Rocky',
    owner: 'Ana Martínez',
    type: 'Control Post-Cirugía',
    veterinarian: 'Dr. Carlos Mendoza',
    status: 'Confirmada',
  },
  {
    id: '4',
    date: '2026-04-17',
    time: '14:00',
    patientName: 'Milo',
    owner: 'Carlos López',
    type: 'Cirugía',
    veterinarian: 'Dr. Carlos Mendoza',
    status: 'Confirmada',
  },
  {
    id: '5',
    date: '2026-04-18',
    time: '09:00',
    patientName: 'Bella',
    owner: 'Laura Torres',
    type: 'Consulta General',
    veterinarian: 'Dra. Laura Ramírez',
    status: 'Pendiente',
  },
];

export default function Appointments() {
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('2026-04-17');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Citas</h1>
          <p className="text-slate-500">Agenda y control de atención médica</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Nueva Cita</DialogTitle>
            </DialogHeader>
            <NewAppointmentForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Citas Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Confirmadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Completadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Agenda de Citas</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Tipo de Cita</TableHead>
                <TableHead>Veterinario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                    No hay citas programadas para esta fecha
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{appointment.owner}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{appointment.type}</Badge>
                    </TableCell>
                    <TableCell>{appointment.veterinarian}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          appointment.status === 'Confirmada'
                            ? 'bg-emerald-100 text-emerald-700'
                            : appointment.status === 'Pendiente'
                            ? 'bg-amber-100 text-amber-700'
                            : appointment.status === 'Completada'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {appointment.status === 'Confirmada' && (
                          <Button variant="ghost" size="sm" className="text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {appointment.status !== 'Cancelada' && (
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function NewAppointmentForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: '',
    type: '',
    veterinarianId: '',
    duration: '30',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New appointment:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="patientId">Paciente *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, patientId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar paciente..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Max - María García</SelectItem>
              <SelectItem value="2">Luna - Pedro Sánchez</SelectItem>
              <SelectItem value="3">Rocky - Ana Martínez</SelectItem>
              <SelectItem value="4">Milo - Carlos López</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Fecha *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Hora *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Cita *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consulta">Consulta General</SelectItem>
              <SelectItem value="vacunacion">Vacunación</SelectItem>
              <SelectItem value="cirugia">Cirugía</SelectItem>
              <SelectItem value="emergencia">Emergencia</SelectItem>
              <SelectItem value="control">Control</SelectItem>
              <SelectItem value="grooming">Peluquería</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duración (minutos)</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutos</SelectItem>
              <SelectItem value="30">30 minutos</SelectItem>
              <SelectItem value="45">45 minutos</SelectItem>
              <SelectItem value="60">1 hora</SelectItem>
              <SelectItem value="90">1.5 horas</SelectItem>
              <SelectItem value="120">2 horas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="veterinarianId">Veterinario Asignado *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, veterinarianId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar veterinario..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Dr. Carlos Mendoza</SelectItem>
              <SelectItem value="2">Dra. Laura Ramírez</SelectItem>
              <SelectItem value="3">Dr. Jorge Parra</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="notes">Notas / Observaciones</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            placeholder="Información adicional sobre la cita..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Agendar Cita
        </Button>
      </div>
    </form>
  );
}
