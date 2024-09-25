import React from 'react';

const AboutMeBlock: React.FC = () => {
  return (
    <section className='py-12 px-4 md:px-8 bg-dracula-currentLine'>
      <h2 className='text-3xl font-semibold text-dracula-foreground mb-6'>
        About Me
      </h2>
      <p className='text-dracula-foreground leading-relaxed'>
        With 4+ years of professional web development experience, I am skilled
        in JavaScript/TypeScript frameworks, UX/UI design, mentoring, and
        building complex high-load web applications. Open to remote/on-site
        opportunities in Berlin.
      </p>
    </section>
  );
};

export default AboutMeBlock;
