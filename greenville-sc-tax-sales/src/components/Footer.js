export default function Footer(props) {
  return (
    <footer className="footer bg-slate-200 text-neutral-content">
      <div className="container mx-auto px-4 py-4 grid grid-cols-2">
        <div>
          <span className="m-2 inline-block">
            Copyright © Austin J Hunt 2022 - All right reserved
          </span>
        </div>
        <div>
          <ul>
            {props.config.contact.social.map((item) => {
              return (
                <li key={item.url} className="inline-block m-2">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
