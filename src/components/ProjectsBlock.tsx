import React from 'react';

const projects = [
  {
    name: 'Project Name',
    description: 'Project description...',
    link: 'https://project-link.com',
  },
];

const ProjectsBlock: React.FC = () => {
  return (
    <section className='py-12 px-4 md:px-8 bg-dracula-currentLine'>
      <h2 className='text-3xl font-semibold text-dracula-foreground mb-6'>
        Projects
      </h2>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className='mb-6'>
            <h3 className='text-2xl font-bold text-dracula-green'>
              {project.name}
            </h3>
            <p className='text-dracula-foreground mb-2'>
              {project.description}
            </p>
            <a
              href={project.link}
              className='text-dracula-cyan hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              View Project
            </a>
          </div>
        ))
      ) : (
        <p className='text-dracula-foreground'>Projects will be added soon.</p>
      )}
    </section>
  );
};

export default ProjectsBlock;
