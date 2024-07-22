import { Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AvatarDropdown from '@/features/dashboard-layout/avatar-dropdown';
import { cn } from '@/utils/cn';

const navLinks = [
  { label: 'Pacientes', to: '/patients' },
  { label: 'Prescripciones', to: '/prescriptions' },
  { label: 'Medicamentos', to: '/medicines' },
  { label: 'Historial', to: '/history' },
];

const dropdownLinks = [{ label: 'Configuración', to: '/settings' }];

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
          <h1 className="text-nowrap text-2xl font-bold">E-Med</h1>
        </Link>
      </div>
      {navLinks.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              !isActive && 'hover:bg-muted',
              'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
              isActive && 'bg-primary text-primary-foreground',
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
    <div className="flex min-h-svh w-full bg-muted/60 dark:bg-muted/20">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-background px-2 md:gap-20">
          <MobileNavMenu />
          <div className="flex flex-1 justify-end">
            <AvatarDropdown dropdownLinks={dropdownLinks} />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
