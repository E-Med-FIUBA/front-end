import { Link } from 'react-router-dom';

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
    <div className="mt-4 flex justify-center gap-1 text-sm">
      <span>{text}</span>
      <Link to={to} className="underline">
        {linkText}
      </Link>
    </div>
  );
}
