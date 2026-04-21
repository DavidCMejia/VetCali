import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  PawPrint, 
  Calendar, 
  FileText, 
  TrendingUp,
  AlertCircle,
  Clock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Badge } from "./ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const appointmentsData = [
  { day: 'Lun', citas: 12 },
  { day: 'Mar', citas: 19 },
  { day: 'Mié', citas: 15 },
  { day: 'Jue', citas: 22 },
  { day: 'Vie', citas: 18 },
  { day: 'Sáb', citas: 8 },
];

const patientsData = [
  { mes: 'Ene', pacientes: 45 },
  { mes: 'Feb', pacientes: 52 },
  { mes: 'Mar', pacientes: 61 },
  { mes: 'Abr', pacientes: 58 },
];

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'propietario') {
    return <OwnerDashboard />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Resumen de actividad y estadísticas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Citas Hoy
            </CardTitle>
            <Calendar className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600">+2</span> desde ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pacientes Activos
            </CardTitle>
            <PawPrint className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">248</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600">+18</span> este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Historias Nuevas
            </CardTitle>
            <FileText className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">34</div>
            <p className="text-xs text-slate-500 mt-1">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Ingresos Mes
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$8.4M</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600">+12%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Citas de la Semana */}
        <Card>
          <CardHeader>
            <CardTitle>Citas de la Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="citas" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crecimiento de Pacientes */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={patientsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="pacientes" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Citas */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', patient: 'Max', owner: 'María García', type: 'Consulta General' },
                { time: '10:30 AM', patient: 'Luna', owner: 'Pedro Sánchez', type: 'Vacunación' },
                { time: '11:00 AM', patient: 'Rocky', owner: 'Ana Martínez', type: 'Control' },
                { time: '02:00 PM', patient: 'Milo', owner: 'Carlos López', type: 'Cirugía' },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{appointment.patient}</div>
                    <div className="text-sm text-slate-600">{appointment.owner}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{appointment.time}</div>
                    <Badge variant="secondary" className="mt-1">{appointment.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas y Recordatorios */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas y Recordatorios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-red-900">Medicamento por agotarse</div>
                  <div className="text-sm text-red-700">Amoxicilina 500mg - Stock: 5 unidades</div>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-900">Vacunación pendiente</div>
                  <div className="text-sm text-amber-700">3 pacientes requieren refuerzo de vacunas</div>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900">Recordatorio</div>
                  <div className="text-sm text-blue-700">Reunión de equipo - Mañana 3:00 PM</div>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-emerald-900">Seguimiento</div>
                  <div className="text-sm text-emerald-700">Rocky - Control post-cirugía en 2 días</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mis Mascotas</h1>
        <p className="text-slate-500">Información y próximas citas de tus mascotas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Mis Mascotas
            </CardTitle>
            <PawPrint className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2</div>
            <p className="text-xs text-slate-500 mt-1">Registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Próxima Cita
            </CardTitle>
            <Calendar className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1</div>
            <p className="text-xs text-slate-500 mt-1">En 3 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Vacunas al día
            </CardTitle>
            <FileText className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">✓</div>
            <p className="text-xs text-slate-500 mt-1">Todas completas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Mascotas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Max', species: 'Perro', breed: 'Labrador', age: '3 años', status: 'Saludable' },
              { name: 'Luna', species: 'Gato', breed: 'Siamés', age: '2 años', status: 'Saludable' },
            ].map((pet, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">{pet.name}</div>
                  <div className="text-sm text-slate-600">{pet.species} - {pet.breed}</div>
                  <div className="text-sm text-slate-500">{pet.age}</div>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {pet.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
