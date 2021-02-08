import React from 'react';

const Projects = ({ data }) => (
  <section>
    <h1 className="section-header">{ data.title || "Side Projects"}</h1>
    {
      data.subtitle && <h2 className="text-secondary-500" dangerouslySetInnerHTML={{__html: data.subtitle}}></h2>
    }
    {data.projects.map(item => (
      <article className="mt-1 mb-1" key={item.name}>
        <h2 className="item-header">{item.name}</h2>
        <h3 className="item-sub">{item.company} {  item.start && <span> | { item.start } - { item.end || "Active" } </span> }</h3>
        <h4 className="item-sub text-secondary-500"><span className="text-secondary-700" >Technologies: </span> {item.technologies}</h4>
        {item.description && <p className="pt-1 pb-3" dangerouslySetInnerHTML={{__html: item.description}} ></p> }
        {item.descriptions && item.descriptions.map(description => <p className="pb-3" dangerouslySetInnerHTML={{__html: description}} ></p>) }
        { item.link && (
        <div className="flex justify-end">
          <a
            className="btn btn-secondary mr-2"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Project
          </a>
        </div>        
        )}
        { item.links && <div className="flex justify-end"> 
          {item.links.map(link => (          
              <a
                className="btn btn-secondary mr-2"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title || "Visit Project"}
              </a>          
            ))
          }          
        </div>
        }
      </article>
    ))}
  </section>
);

export default Projects;
