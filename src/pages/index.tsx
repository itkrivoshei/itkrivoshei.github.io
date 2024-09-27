import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import NamePositionBlock from '../components/NamePositionBlock';
import AboutMeBlock from '../components/AboutMeBlock';
import ExperienceBlock from '../components/ExperienceBlock';
import ProjectsBlock from '../components/ProjectsBlock';
import ContactMeBlock from '../components/ContactMeBlock';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className='bg-dracula-background min-h-screen font-sans text-dracula-foreground'>
      <NamePositionBlock />
      <AboutMeBlock />
      <ExperienceBlock />
      <ProjectsBlock />
      <ContactMeBlock />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Home - Nikita Krivoshei</title>
    <meta
      name='description'
      content='Fullstack Frontend Engineer and UI/UX Designer based in Berlin, Germany.'
    />
  </>
);
