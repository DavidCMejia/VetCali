import { Link } from "react-router";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">Página no encontrada</h2>
        <p className="text-slate-500 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Home className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
