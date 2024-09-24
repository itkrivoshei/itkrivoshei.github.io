import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Link } from 'gatsby';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className='bg-dracula-background min-h-screen flex items-center justify-center font-sans text-dracula-foreground'>
      <div className='text-center p-6'>
        <h1 className='text-4xl font-bold mb-4'>Page Not Found</h1>
        <p className='mb-6'>
          Sorry, we couldn’t find the page you were looking for.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className='mb-6'>
            Try creating a page in{' '}
            <code className='bg-dracula-selection px-2 py-1 rounded'>
              src/pages/
            </code>
            .
          </p>
        )}
        <Link
          to='/'
          className='text-dracula-pink hover:underline font-medium text-lg'
        >
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Page Not Found - 404</title>;
