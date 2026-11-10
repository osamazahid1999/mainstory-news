import Image from "next/image";

export default function BrandLogo() {
  return (
    <Image
      src="/main-story-news-logo.svg"
      alt="Main Story News"
      width={1550}
      height={230}
      className="brand-logo-image"
      priority
    />
  );
}
