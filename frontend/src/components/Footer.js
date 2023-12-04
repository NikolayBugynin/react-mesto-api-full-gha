export default function Footer({ isloggedIn }) {
  const data = new Date();
  const year = data.getFullYear();

  return (
    isloggedIn && (
      <footer className="footer">
        <p className="footer__copyright">
          © {year} Mesto Russia by Nikolay Bugynin
        </p>
      </footer>
    )
  );
}
