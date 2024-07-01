import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function AvatarDropdown({
  dropdownLinks,
}: {
  dropdownLinks: { label: string; to: string }[];
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer border rounded-full p-1">
          <Avatar>
            <AvatarImage
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              className="object-cover hover:brightness-75 transition-all duration-200"
            />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownLinks.map((link) => (
          <DropdownMenuItem key={link.to} className="cursor-pointer" asChild>
            <Link to={link.to}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            size="fit"
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
