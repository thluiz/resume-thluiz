import React from 'react';

const Summary = ({ data }) => (
  <section className="py-5 border-b border-neutral-300 lg:flex items-center">
    <div className="my-2 lg:w-1/5">
      <img
        className="rounded-full mx-auto w-32 lg:w-4/5 xl:w-4/5"
        src="./profile.jpg"
        alt="profile"
      />
    </div>
    <p className="px-5 md:px-10 sm:px-1 text-left tracking-wide leading-relaxed w-full lg:w-4/5 xl:w-full lg:text-lg" dangerouslySetInnerHTML={{__html: data }}>      
    </p>
  </section>
);

export default Summary;
