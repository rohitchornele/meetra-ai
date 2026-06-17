const footerLinks = [
  {
    name: "Privacy",
    href: "#",
  },
  {
    name: "Terms",
    href: "#",
  },
  {
    name: "Security",
    href: "#",
  },
  {
    name: "Status",
    href: "#",
  },
];
export default function Footer() {
  return (
    <footer
      className="
      border-t
      border-border
      px-[5vw]
      py-10
    "
    >
      <div
        className="
        max-w-[1200px]
        mx-auto
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
      "
      >
        {/* Logo */}
        <div
          className="
          font-extrabold
          text-lg
          tracking-[-0.02em]
          text-text
        "
        >
          Convert
          <span className="text-accent">
            IQ
          </span>
        </div>
        {/* Links */}
        <div
          className="
          flex
          items-center
          gap-6
          flex-wrap
          justify-center
        "
        >
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
              text-sm
              text-text2
              transition-colors
              hover:text-text
            "
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Copyright */}
        <p
          className="
          text-sm
          text-text2
          text-center
        "
        >
          © 2026 ConvertIQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}