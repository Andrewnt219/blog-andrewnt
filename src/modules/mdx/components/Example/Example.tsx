import { VFC } from 'react';

type Props = {
  className?: string;
};
const Example: VFC<Props> = ({ className }) => {
  return (
    <div tw="text-hero" className={className}>
      Example
    </div>
  );
};

export default Example;
