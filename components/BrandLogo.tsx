import Image from "next/image";

export default function BrandLogo() {
  return (
    <Image
      src="/main-story-news-logo.svg"
      alt="Main Story News"
      width={1893}
      height={395}
      className="brand-logo-image"
      priority
    />
  );
}
