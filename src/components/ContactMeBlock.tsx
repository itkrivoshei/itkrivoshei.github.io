import React from 'react';

const ContactMeBlock: React.FC = () => {
  return (
    <section className='py-12 px-4 md:px-8 bg-dracula-background'>
      <h2 className='text-3xl font-semibold text-dracula-foreground mb-6'>
        Contact Me
      </h2>
      <p className='text-dracula-foreground mb-4'>
        Feel free to reach out if you're interested in working together.
      </p>
      <ul className='text-dracula-foreground space-y-2'>
        <li>
          <strong>Email:</strong>{' '}
          <a
            href='mailto:NikitaKrivoshei@gmail.com'
            className='text-dracula-pink hover:underline'
          >
            NikitaKrivoshei@gmail.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a
            href='tel:+491797006894'
            className='text-dracula-pink hover:underline'
          >
            +49 179 700 6894
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a
            href='https://linkedin.com/in/itkivoshei'
            className='text-dracula-pink hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            linkedin.com/in/itkivoshei
          </a>
        </li>
        <li>
          <strong>GitHub:</strong>{' '}
          <a
            href='https://github.com/itkrivoshei'
            className='text-dracula-pink hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            github.com/itkrivoshei
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ContactMeBlock;
