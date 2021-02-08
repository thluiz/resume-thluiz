import React from 'react';

const Education = ({ data }) => (
  <section className="mb-5">
    <h1 className="section-header mb-5">Education</h1>
    {data &&
      data.map(item => (
        <div className="my-2" key={item.degree}>
          <h2 className="item-header text-lg">{item.degree}</h2>
          { item.subtitle_degree && <h3 className="item-sub">{ item.subtitle_degree }</h3> }
          <h3 className="item-sub text-secondary-500">
            { (item.institution_url  )
              ? <a
                className="mr-2"
                href={item.institution_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                { item.institution }
              </a>
            : 
            <span> { item.institution } </span>            
          }
          </h3>
          <p className="text-sm text-neutral-500 font-light">
            {item.start} - {item.end || "Present"}
          </p>
        </div>
      ))}
  </section>
);

export default Education;
