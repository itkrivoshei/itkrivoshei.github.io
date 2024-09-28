import React from 'react';

const ProjectsBlock: React.FC = () => {
  return (
    <section className='py-12 px-4 md:px-8 bg-dracula-currentLine'>
      <h2 className='text-3xl font-semibold text-dracula-foreground mb-6'>
        Projects
      </h2>
      <p className='text-dracula-foreground'>
        Please visit my GitHub profile to explore my projects:
      </p>
      <a
        href='https://github.com/itkrivoshei'
        className='text-dracula-pink hover:underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        github.com/itkrivoshei
      </a>
    </section>
  );
};

export default ProjectsBlock;
