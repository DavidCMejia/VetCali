import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
import { FileText, Plus, Search, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface MedicalRecord {
  id: string;
  patientName: string;
  date: string;
  type: string;
  veterinarian: string;
  diagnosis: string;
  status: 'Abierta' | 'Cerrada';
}

const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    patientName: 'Max',
    date: '15/04/2026',
    type: 'Consulta General',
    veterinarian: 'Dr. Carlos Mendoza',
    diagnosis: 'Control rutinario - Estado saludable',
    status: 'Cerrada',
  },
  {
    id: '2',
    patientName: 'Luna',
    date: '14/04/2026',
    type: 'Vacunación',
    veterinarian: 'Dra. Laura Ramírez',
    diagnosis: 'Aplicación de vacuna antirrábica',
    status: 'Cerrada',
  },
  {
    id: '3',
    patientName: 'Rocky',
    date: '16/04/2026',
    type: 'Cirugía',
    veterinarian: 'Dr. Carlos Mendoza',
    diagnosis: 'Esterilización - En recuperación',
    status: 'Abierta',
  },
];

export default function MedicalRecords() {
  const [records] = useState<MedicalRecord[]>(mockRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<MedicalRecord | null>(null);

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Historias Clínicas</h1>
          <p className="text-slate-500">Gestión de registros médicos de pacientes</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Historia Clínica
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Historia Clínica</DialogTitle>
            </DialogHeader>
            <NewMedicalRecordForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Historias Clínicas</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por paciente o diagnóstico..."
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
                <TableHead>Fecha</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Tipo de Atención</TableHead>
                <TableHead>Veterinario</TableHead>
                <TableHead>Diagnóstico</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.patientName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.type}</Badge>
                  </TableCell>
                  <TableCell>{record.veterinarian}</TableCell>
                  <TableCell className="max-w-xs truncate">{record.diagnosis}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        record.status === 'Abierta'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-700'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewingRecord(record)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={viewingRecord !== null} onOpenChange={() => setViewingRecord(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Historia Clínica - {viewingRecord?.patientName}</DialogTitle>
          </DialogHeader>
          {viewingRecord && <MedicalRecordDetails record={viewingRecord} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NewMedicalRecordForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    patientId: '',
    type: '',
    reason: '',
    symptoms: '',
    temperature: '',
    weight: '',
    heartRate: '',
    respiratoryRate: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    observations: '',
    nextVisit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New medical record:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="exam">Examen Físico</TabsTrigger>
          <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
          <TabsTrigger value="treatment">Tratamiento</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Paciente *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, patientId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Max - Labrador</SelectItem>
                  <SelectItem value="2">Luna - Siamés</SelectItem>
                  <SelectItem value="3">Rocky - Pastor Alemán</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Atención *</Label>
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
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo de Consulta *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Síntomas Reportados</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              rows={3}
            />
          </div>
        </TabsContent>

        <TabsContent value="exam" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperatura (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              />
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

            <div className="space-y-2">
              <Label htmlFor="heartRate">Frecuencia Cardíaca (lpm)</Label>
              <Input
                id="heartRate"
                type="number"
                value={formData.heartRate}
                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="respiratoryRate">Frecuencia Respiratoria (rpm)</Label>
              <Input
                id="respiratoryRate"
                type="number"
                value={formData.respiratoryRate}
                onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="diagnosis" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnóstico *</Label>
            <Textarea
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observaciones Adicionales</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="treatment">Plan de Tratamiento</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Medicamentos Prescritos</Label>
            <Textarea
              id="medications"
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              rows={4}
              placeholder="Nombre del medicamento, dosis, frecuencia, duración..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextVisit">Próxima Visita</Label>
            <Input
              id="nextVisit"
              type="date"
              value={formData.nextVisit}
              onChange={(e) => setFormData({ ...formData, nextVisit: e.target.value })}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Guardar Historia Clínica
        </Button>
      </div>
    </form>
  );
}

function MedicalRecordDetails({ record }: { record: MedicalRecord }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
        <div>
          <div className="text-sm text-slate-600">Paciente</div>
          <div className="font-medium text-slate-900">{record.patientName}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Fecha</div>
          <div className="font-medium text-slate-900">{record.date}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Tipo de Atención</div>
          <div className="font-medium text-slate-900">{record.type}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Veterinario</div>
          <div className="font-medium text-slate-900">{record.veterinarian}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Motivo de Consulta</h4>
          <p className="text-slate-700">Control rutinario anual</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Examen Físico</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-sm text-slate-600">Temperatura</div>
              <div className="font-medium">38.5°C</div>
            </div>
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-sm text-slate-600">Peso</div>
              <div className="font-medium">28.5 kg</div>
            </div>
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-sm text-slate-600">Frecuencia Cardíaca</div>
              <div className="font-medium">90 lpm</div>
            </div>
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-sm text-slate-600">Frecuencia Respiratoria</div>
              <div className="font-medium">24 rpm</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Diagnóstico</h4>
          <p className="text-slate-700">{record.diagnosis}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Tratamiento</h4>
          <p className="text-slate-700">Continuar con dieta balanceada y ejercicio regular. Próximo control en 6 meses.</p>
        </div>
      </div>
    </div>
  );
}
