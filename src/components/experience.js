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
          { item.achievements && <section>
            <h2 className="text-secondary-500 p-0">{item.achievements.title}</h2>
            <ul class="list-disc ml-5 p-0">
              { item.achievements.list.map(achievement => <li className="pb-1" dangerouslySetInnerHTML={{__html: achievement }} ></li>) }
            </ul>
          </section>}
        </article>
      ))}
  </section>
);

export default Experience;
