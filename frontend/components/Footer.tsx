type FooterProps = {
  shouldShow: boolean;
};
const Footer = ({ shouldShow }: FooterProps) => {
  return shouldShow ? (
    <footer className="flex flex-col justify-center bg-slate-600 py-5 text-white">
      <small>
        URL Mapper is created by tlylt, view on{" "}
        <a
          className="underline"
          href="https://github.com/tlylt"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="link to github repository"
        >
          Github
        </a>
      </small>
      <div>
        <a
          className="underline"
          href="https://www.privacypolicygenerator.info/live.php?token=vty5EhWt1JyJiMEQxxbQ72njyoDspDj1"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="link to Privacy Policy"
        >
          <small>Privacy Policy</small>
        </a>
        <a
          className="pl-2 underline"
          href="https://www.termsofusegenerator.net/live.php?token=HGuT8ADJ1kmB2W8c9C1RIwM5kKc6DNFT"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="link to Terms of Use"
        >
          <small>Terms of Use</small>
        </a>
      </div>
    </footer>
  ) : null;
};

export default Footer;
