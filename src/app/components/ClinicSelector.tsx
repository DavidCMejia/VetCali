import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Building2, 
  MapPin, 
  Users, 
  PawPrint, 
  CheckCircle2,
  Search,
  Star,
  TrendingUp
} from "lucide-react";

interface Clinic {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  users: number;
  patients: number;
  isActive: boolean;
  isFavorite: boolean;
  lastAccess: string;
}

const mockClinics: Clinic[] = [
  {
    id: 'org-1',
    name: 'Clínica Veterinaria Cali Sur',
    type: 'Clínica',
    city: 'Cali',
    address: 'Calle 5 # 45-32, Sur de Cali',
    users: 8,
    patients: 248,
    isActive: true,
    isFavorite: true,
    lastAccess: 'Hoy, 08:30 AM',
  },
  {
    id: 'org-2',
    name: 'Hospital Veterinario Norte',
    type: 'Hospital',
    city: 'Cali',
    address: 'Avenida 6N # 25-78, Norte de Cali',
    users: 15,
    patients: 512,
    isActive: false,
    isFavorite: true,
    lastAccess: 'Ayer, 05:45 PM',
  },
  {
    id: 'org-3',
    name: 'Centro Médico Animal',
    type: 'Centro Médico',
    city: 'Cali',
    address: 'Carrera 100 # 15-20, Oeste de Cali',
    users: 5,
    patients: 156,
    isActive: false,
    isFavorite: false,
    lastAccess: '15/04/2026',
  },
  {
    id: 'org-4',
    name: 'Veterinaria Pet Care',
    type: 'Clínica',
    city: 'Cali',
    address: 'Carrera 5 # 70-45, Norte de Cali',
    users: 4,
    patients: 98,
    isActive: false,
    isFavorite: false,
    lastAccess: '10/04/2026',
  },
];

export default function ClinicSelector() {
  const [clinics] = useState<Clinic[]>(mockClinics);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeClinic, setActiveClinic] = useState(clinics[0]);

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSwitchClinic = (clinic: Clinic) => {
    setActiveClinic(clinic);
    // Aquí se cambiaría el contexto de la aplicación
    console.log('Switching to clinic:', clinic.name);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Múltiples Clínicas</h1>
        <p className="text-slate-500">Cambia entre tus organizaciones veterinarias</p>
      </div>

      {/* Clínica Activa */}
      <Card className="border-2 border-emerald-500 bg-gradient-to-r from-emerald-50 to-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Clínica Activa
            </CardTitle>
            <Badge className="bg-emerald-600">Conectado</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{activeClinic.name}</h3>
              <div className="flex items-center gap-2 text-slate-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{activeClinic.address}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Usuarios</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">{activeClinic.users}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <PawPrint className="w-4 h-4" />
                    <span className="text-xs">Pacientes</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">{activeClinic.patients}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs">Estado</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-600">Activo</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Búsqueda */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Mis Clínicas</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar clínica..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredClinics.map((clinic) => (
              <div
                key={clinic.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  clinic.id === activeClinic.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      clinic.id === activeClinic.id
                        ? 'bg-emerald-600'
                        : 'bg-slate-100'
                    }`}
                  >
                    <Building2
                      className={`w-6 h-6 ${
                        clinic.id === activeClinic.id ? 'text-white' : 'text-slate-600'
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{clinic.name}</h4>
                      {clinic.isFavorite && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                      <Badge variant="outline" className="ml-auto">
                        {clinic.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{clinic.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{clinic.users} usuarios</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PawPrint className="w-3 h-3" />
                        <span>{clinic.patients} pacientes</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 mt-2">
                      Último acceso: {clinic.lastAccess}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {clinic.id === activeClinic.id ? (
                      <Badge className="bg-emerald-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Activa
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => handleSwitchClinic(clinic)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Cambiar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Agregar Nueva Clínica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              ¿Administras múltiples clínicas veterinarias? Agrega una nueva organización a tu cuenta.
            </p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Building2 className="w-4 h-4 mr-2" />
              Crear Nueva Clínica
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Unirse a una Clínica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              ¿Te invitaron a trabajar en otra clínica? Únete usando un código de invitación.
            </p>
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Ingresar Código
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
