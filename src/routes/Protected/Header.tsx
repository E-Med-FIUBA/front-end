import { Link, Outlet } from "react-router-dom";
import { AvatarDropdown } from "@/features/header";
import { Button } from "@/components";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Pacientes", to: "#" },
  { label: "Prescripciones", to: "/prescriptions" },
  { label: "Medicamentos", to: "#" },
  { label: "Historial", to: "#" },
];

const dropdownLinks = [
  { label: "Perfil", to: "/profile" },
  { label: "Configuración", to: "/settings" },
  { label: "Cerrar sesión", to: "/logout" },
];

const NavMenu = () => (
  <div className="hidden md:flex items-center w-full">
    <div className="flex gap-6">
      {navLinks.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
    <div className="flex flex-1 justify-end">
      <AvatarDropdown dropdownLinks={dropdownLinks} />
    </div>
  </div>
);

const MobileNavMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex-1 justify-end md:hidden">
        <Button className="p-2" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetDescription className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
          {dropdownLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default function Header() {
  return (
    <>
      <header className="h-16 border-b">
        <nav className="container h-full flex items-center md:gap-20">
          <Link to="/dashboard" className="flex h-full items-center gap-2">
            <img
              src="https://via.placeholder.com/150"
              alt="logo"
              className="max-h-full py-2"
            />
            <h1 className="text-2xl font-bold text-nowrap">E-Med</h1>
          </Link>
          <NavMenu />
          <MobileNavMenu />
        </nav>
      </header>
      <Outlet />
    </>
  );
}
