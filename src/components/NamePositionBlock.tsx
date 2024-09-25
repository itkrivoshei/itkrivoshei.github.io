import React from 'react';

const NamePositionBlock: React.FC = () => {
  return (
    <section className='text-center py-16 bg-dracula-background'>
      <h1 className='text-5xl font-bold text-dracula-foreground mb-4'>
        Nikita Krivoshei
      </h1>
      <h2 className='text-2xl font-medium text-dracula-comment'>
        Fullstack Frontend Developer
      </h2>
    </section>
  );
};

export default NamePositionBlock;
