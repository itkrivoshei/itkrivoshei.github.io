import React from 'react';

const experiences = [
  {
    role: 'Frontend Developer, SPRYLAB',
    location: 'Berlin, Germany',
    duration: 'September 2023 - Present',
    responsibilities: [
      'Developed digital platforms for 5+ German web newspapers and magazines, including ‘Mopo’, ‘Ourmedia Projects’, and ‘Apotheken Umschau’, reaching 10M+ users.',
      'Worked with a CMS-based app builder, launching 15+ apps, improving deployment speed by 20%.',
      'Collaborated with design and backend teams to boost page load times by 25% and mobile traffic by 15%.',
    ],
  },
];

const ExperienceBlock: React.FC = () => {
  return (
    <section className='py-12 px-4 md:px-8 bg-dracula-background'>
      <h2 className='text-3xl font-semibold text-dracula-foreground mb-6'>
        Experience
      </h2>
      {experiences.map((exp, index) => (
        <div key={index} className='mb-8'>
          <h3 className='text-2xl font-bold text-dracula-pink'>{exp.role}</h3>
          <p className='text-dracula-comment mb-2'>
            {exp.location} | {exp.duration}
          </p>
          <ul className='list-disc list-inside text-dracula-foreground space-y-2'>
            {exp.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default ExperienceBlock;
