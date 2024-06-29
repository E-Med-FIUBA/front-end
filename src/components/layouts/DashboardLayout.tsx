import { Link, NavLink } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "@/features/header";

const navLinks = [
    { label: "Pacientes", to: "/app/patients" },
    { label: "Prescripciones", to: "/app/prescriptions" },
    { label: "Medicamentos", to: "/app/medicines" },
    { label: "Historial", to: "/app/history" },
  ];
  
  const dropdownLinks = [
    { label: "Perfil", to: "/app/profile" },
    { label: "Configuración", to: "/app/settings" },
    { label: "Cerrar sesión", to: "/app/logout" },
  ];

const NavMenu = () => (
    <div className="hidden md:flex items-center w-full">
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "opacity-50" : "",
                isActive ? "font-bold" : "",
                isTransitioning ? "text-blue-500" : "",
              ].join(" ")
            }
          >
            {link.label}
          </NavLink>
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
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
            {dropdownLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
  };

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  console.log("DashboardLayout");
  return (
    <div>
      <header className="h-16 border-b">
        <nav className="container h-full flex items-center md:gap-20">
          <Link to="/app/dashboard" className="flex h-full items-center gap-2">
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
      <main>{children}</main>
    </div>
  );
}
