import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  PawPrint, 
  Calendar, 
  FileText, 
  Phone,
  Clock,
  Heart,
  Activity,
  AlertCircle
} from "lucide-react";

export default function OwnerPortalSimple() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Portal del Propietario</h1>
        <p className="text-slate-500">Información y cuidado de tus mascotas</p>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <div className="text-2xl font-bold text-slate-900">20/04</div>
            <p className="text-xs text-slate-500 mt-1">En 3 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Consultas
            </CardTitle>
            <FileText className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8</div>
            <p className="text-xs text-slate-500 mt-1">Historias clínicas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Estado General
            </CardTitle>
            <Heart className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">✓</div>
            <p className="text-xs text-slate-500 mt-1">Saludables</p>
          </CardContent>
        </Card>
      </div>

      {/* Mis Mascotas - Vista Compacta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <PawPrint className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle>Max</CardTitle>
                <p className="text-sm text-slate-500">Labrador • Macho • 3 años</p>
              </div>
              <Badge className="ml-auto bg-emerald-100 text-emerald-700">Saludable</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Peso</span>
                </div>
                <div className="font-bold text-slate-900">28.5 kg</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Última visita</span>
                </div>
                <div className="font-bold text-slate-900">15/04/26</div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Próxima Cita</span>
              </div>
              <div className="text-sm text-blue-700">20 de Abril • 09:00 AM</div>
              <div className="text-xs text-blue-600 mt-1">Control General</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Vacunas</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                  Al día
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Desparasitación</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                  Al día
                </Badge>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Ver Historial Completo
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <PawPrint className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle>Luna</CardTitle>
                <p className="text-sm text-slate-500">Siamés • Hembra • 2 años</p>
              </div>
              <Badge className="ml-auto bg-emerald-100 text-emerald-700">Saludable</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Peso</span>
                </div>
                <div className="font-bold text-slate-900">3.8 kg</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Última visita</span>
                </div>
                <div className="font-bold text-slate-900">14/04/26</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <div className="text-sm text-slate-600">No hay citas programadas</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Vacunas</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                  Al día
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Esterilizada</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                  Sí
                </Badge>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Agendar Cita
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recordatorios */}
      <Card>
        <CardHeader>
          <CardTitle>Recordatorios y Alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-blue-900">Cita Próxima - Max</div>
                <div className="text-sm text-blue-700 mt-1">
                  Control general programado para el 20 de Abril a las 09:00 AM
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-emerald-900">Vacunas al Día</div>
                <div className="text-sm text-emerald-700 mt-1">
                  Todas las vacunas de tus mascotas están actualizadas
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>Mi Clínica Veterinaria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">Clínica Veterinaria Cali Sur</h3>
              <div className="space-y-1 text-sm text-slate-600">
                <div>📍 Calle 5 # 45-32, Sur de Cali</div>
                <div>📞 602-555-0001</div>
                <div>✉️ contacto@vetcalisur.com</div>
                <div>🕒 Lun-Vie: 8:00 AM - 6:00 PM | Sáb: 9:00 AM - 2:00 PM</div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Ahora
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Cita
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
