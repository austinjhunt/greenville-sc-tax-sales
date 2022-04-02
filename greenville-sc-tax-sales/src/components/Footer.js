export default function Footer(props) {
  return (
    <footer className="footer items-center p-4 bg-slate-200 text-neutral-content">
      <div className="items-center grid-cols-2 grid gap-4">
        <div>
          <p>Copyright © Austin J Hunt 2022 - All right reserved</p>
          <p>
            If you would like to provide feedback about this app, please{" "}
            <a
              className="m-0 font-bold"
              href={`mailto:${props.config.social.email}`}
            >
              email me at {props.config.social.email}
            </a>
            !
          </p>
        </div>
        <div className="flex justify-end">
          <a
            href={props.config.social.website}
            target="_blank"
            rel="noreferrer"
            className="mx-3"
          >
            Portfolio
          </a>
          <a
            href={props.config.social.twitter}
            target="_blank"
            rel="noreferrer"
            className="mx-3"
          >
            Twitter
          </a>
          <a
            href={props.config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mx-3"
          >
            LinkedIn
          </a>
          <a
            href={props.config.social.github}
            target="_blank"
            rel="noreferrer"
            className="mx-3"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
