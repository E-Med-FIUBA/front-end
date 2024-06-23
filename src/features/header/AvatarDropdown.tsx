import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function AvatarDropdown({
  dropdownLinks,
}: {
  dropdownLinks: { label: string; to: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200  rounded-full p-1 transition-colors duration-200 ease-in-out">
          <Avatar>
            <AvatarImage src="https://via.placeholder.com/150" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <ChevronDown className="w-auto h-5" color="#828282" />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
