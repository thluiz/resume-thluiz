import React from 'react';

const Experience = ({ data }) => (
  <section>
    <h1 className="section-header">Experience</h1>
    {data &&
      data.map((item, i) => (
        <article className="my-5" key={`${item.company}-${i}`}>
          <h2 className="item-header">{item.role}</h2>
          <h3 className="item-sub">
            {item.company} | {item.start} - {item.end || 'PRESENT'}
          </h3>
          { item.description && <p className="pt-2" dangerouslySetInnerHTML={{__html: item.description }} ></p> }
          { item.descriptions && item.descriptions.map(description => <p className="pt-2" dangerouslySetInnerHTML={{__html: description }} ></p>) }
        </article>
      ))}
  </section>
);

export default Experience;
