import { Link, Outlet } from "react-router-dom";
import { AvatarDropdown } from "@/features/header";

export default function Header() {
  return (
    <>
      <header className="h-16 border-b">
        <nav className="container h-full flex items-center gap-20">
          <Link to="/dashboard" className="flex h-full items-center gap-2">
            <img
              src="https://via.placeholder.com/150"
              alt="logo"
              className="max-h-full py-2"
            />
            <h1 className="text-2xl font-bold">E-Med</h1>
          </Link>
          <div className="flex gap-6">
            <Link to="#">Pacientes</Link>
            <Link to="/prescriptions">Prescripciones</Link>
            <Link to="#">Medicamentos</Link>
            <Link to="#">Historial</Link>
          </div>
          <div className="flex flex-1 justify-end">
            <AvatarDropdown />
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
