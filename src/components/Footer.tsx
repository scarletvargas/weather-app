import Link from "next/link";

export const Footer = () => {
  return (
    <p className="text-medium text-lg">
      Made with love by{" "}
      <Link
        className="text-sienna-900 dark:text-sienna-300 dark:hover:text-sienna-600 hover:text-sienna-600"
        href="https://github.com/scarletvargas"
        target="_black"
      >
        DevScarlet.
      </Link>
    </p>
  );
};
