import { Link } from "react-router-dom";

export function AuthFormFooter({
  to,
  text,
  linkText,
}: {
  to: string;
  text: string;
  linkText: string;
}) {
  return (
    <div className="mt-4 text-sm flex gap-1 justify-center">
      <span>{text}</span>
      <Link to={to} className="underline">
        {linkText}
      </Link>
    </div>
  );
}
