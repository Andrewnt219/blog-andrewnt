import { ReactNode } from 'react';

type Props = {
  className?: string;
  title: ReactNode;
  subTitle: ReactNode;
};
function SectionHeader({ className, title, subTitle }: Props) {
  return (
    <header className={className} tw="border-b  pb-lg md:pb-2xl">
      <h2 tw="font-black text-hero ">{title}</h2>
      <p tw="text-textmuted text-h3">{subTitle}</p>
    </header>
  );
}

export default SectionHeader;
