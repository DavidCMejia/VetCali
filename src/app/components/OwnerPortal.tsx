import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { PawPrint, Calendar, FileText, Phone, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function OwnerPortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Portal del Propietario</h1>
        <p className="text-slate-500">Información completa de tus mascotas</p>
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
            <div className="text-2xl font-bold text-slate-900">20/04</div>
            <p className="text-xs text-slate-500 mt-1">En 3 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Historias Clínicas
            </CardTitle>
            <FileText className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8</div>
            <p className="text-xs text-slate-500 mt-1">Total de registros</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Max */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle>Max</CardTitle>
                  <p className="text-sm text-slate-500">Labrador Retriever • 3 años</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">Saludable</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="appointments">Citas</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-slate-600">Sexo</div>
                    <div className="font-medium">Macho</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Peso</div>
                    <div className="font-medium">28.5 kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Color</div>
                    <div className="font-medium">Dorado</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Microchip</div>
                    <div className="font-medium">928374650</div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm text-slate-600 mb-2">Vacunas al día</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rabia</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Al día</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Parvovirus</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Al día</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Moquillo</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Al día</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-3 mt-4">
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Control Rutinario</div>
                      <div className="text-sm text-slate-500">15/04/2026</div>
                    </div>
                    <div className="text-sm text-slate-600">Estado saludable. Peso normal.</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Vacunación</div>
                      <div className="text-sm text-slate-500">10/03/2026</div>
                    </div>
                    <div className="text-sm text-slate-600">Refuerzo anual de rabia.</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-3 mt-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-blue-900">Próxima Cita</div>
                      <div className="text-sm text-blue-700 mt-1">
                        20 de Abril, 2026 • 09:00 AM
                      </div>
                      <div className="text-sm text-blue-700">Control General</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar Clínica
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Luna */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle>Luna</CardTitle>
                  <p className="text-sm text-slate-500">Gato Siamés • 2 años</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">Saludable</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="appointments">Citas</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-slate-600">Sexo</div>
                    <div className="font-medium">Hembra</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Peso</div>
                    <div className="font-medium">3.8 kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Color</div>
                    <div className="font-medium">Crema/Marrón</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Esterilizada</div>
                    <div className="font-medium">Sí</div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm text-slate-600 mb-2">Vacunas al día</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Triple Felina</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Al día</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Rabia</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Al día</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-3 mt-4">
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Vacunación</div>
                      <div className="text-sm text-slate-500">14/04/2026</div>
                    </div>
                    <div className="text-sm text-slate-600">Aplicación de vacuna antirrábica.</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Esterilización</div>
                      <div className="text-sm text-slate-500">05/02/2026</div>
                    </div>
                    <div className="text-sm text-slate-600">Cirugía exitosa. Recuperación normal.</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-3 mt-4">
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <div className="text-sm text-slate-600">No hay citas programadas</div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Agendar Cita
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-semibold text-slate-900 mb-2">Clínica Veterinaria Cali Sur</div>
              <div className="space-y-1 text-sm text-slate-600">
                <div>📍 Calle 5 # 45-32, Sur de Cali</div>
                <div>📞 602-555-0001</div>
                <div>✉️ contacto@vetcalisur.com</div>
                <div>🕒 Lun-Vie: 8:00 AM - 6:00 PM | Sáb: 9:00 AM - 2:00 PM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
