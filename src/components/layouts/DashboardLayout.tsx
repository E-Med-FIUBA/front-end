import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "@/features/header";
import { cn } from "@/utils/cn";

const navLinks = [
  { label: "Pacientes", to: "/patients" },
  { label: "Prescripciones", to: "/prescriptions" },
  { label: "Medicamentos", to: "/medicines" },
  { label: "Historial", to: "/history" },
];

const dropdownLinks = [
  { label: "Perfil", to: "/profile" },
  { label: "Configuración", to: "/settings" },
];

const SideNav = () => {
  return (
    <nav className="flex flex-col items-center gap-4 px-2">
      <div className="flex h-16 shrink-0 items-center px-4">
        <Link to="/dashboard" className="flex h-full items-center gap-2">
          <img
            src="https://via.placeholder.com/150"
            alt="logo"
            className="max-h-full py-2"
          />
          <h1 className="text-2xl font-bold text-nowrap">E-Med</h1>
        </Link>
      </div>
      {navLinks.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              !isActive && "hover:bg-muted",
              "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
              isActive && "bg-primary text-primary-foreground"
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

const MobileNavMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button className="p-2" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <SheetTitle hidden>Menu</SheetTitle>
        </SheetHeader>
        <SideNav />
      </SheetContent>
    </Sheet>
  );
};

const SideBar = () => {
  return (
    <aside className="hidden w-60 flex-col border-r bg-background md:flex">
      <SideNav />
    </aside>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex bg-muted/60 dark:bg-muted/20 w-full">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center md:gap-20 h-16 border-b bg-background px-2">
          <MobileNavMenu />
          <div className="flex-1 flex justify-end">
            <AvatarDropdown dropdownLinks={dropdownLinks} />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
