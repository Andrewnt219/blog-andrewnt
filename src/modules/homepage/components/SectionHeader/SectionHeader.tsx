import { ReactNode } from 'react';

type Props = {
  className?: string;
  title: ReactNode;
  subTitle: ReactNode;
};
function SectionHeader({ className, title, subTitle }: Props) {
  return (
    <header className={className} tw="border-b  pb-lg md:pb-2xl">
      <h2 tw="font-black text-h1">{title}</h2>
      <p tw="text-textmuted md:text-lg">{subTitle}</p>
    </header>
  );
}

export default SectionHeader;
