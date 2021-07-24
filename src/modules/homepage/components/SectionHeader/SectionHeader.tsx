import { ReactNode } from 'react';

type Props = {
  className?: string;
  title: ReactNode;
  subTitle: ReactNode;
  id?: string;
};
function SectionHeader({ className, title, subTitle, id }: Props) {
  return (
    <header className={className} tw="border-b  pb-lg md:pb-2xl">
      <h2 style={{ scrollMarginTop: '6rem' }} id={id} tw="font-black text-h1">
        {title}
      </h2>
      <p tw="text-textmuted md:text-lg">{subTitle}</p>
    </header>
  );
}

export default SectionHeader;
