import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button variant="link" asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  );
};
