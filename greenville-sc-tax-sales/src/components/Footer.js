import { SocialIcon } from "react-social-icons";

export default function Footer(props) {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
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
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href={props.config.social.website}
          target="_blank"
          className="w-12 h-12 rounded-full bg-white  text-center  flex items-center justify-center"
        >
          <i className="fa-solid fa-id-badge text-2xl  text-slate-700 "></i>{" "}
        </a>

        <SocialIcon
          bgColor="white"
          url={props.config.social.twitter}
        ></SocialIcon>
        <SocialIcon
          bgColor="white"
          url={props.config.social.linkedin}
        ></SocialIcon>
        <SocialIcon
          bgColor="white"
          url={props.config.social.github}
        ></SocialIcon>
      </div>
    </footer>
  );
}
