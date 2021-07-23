import { ButtonLink } from '@ui/Button/Button';
import dynamic from 'next/dynamic';
import MdxImage from '../MdxImage/MdxImage';
import { MdxOrderedList, MdxUnorderedList } from '../MdxList/MdxList';
import MdxListItem from '../MdxListItem/MdxListItem';
import { MdxTypography } from '../MdxTypography/MdxTypography';
const Example = dynamic(() => import('../Example/Example'));

const MdxComponents = {
  Example,
  Image: MdxImage,
  h1: (props: any) => <MdxTypography {...props} variant="h1" />,
  h2: (props: any) => <MdxTypography {...props} variant="h2" />,
  h3: (props: any) => <MdxTypography {...props} variant="h3" />,
  h4: (props: any) => <MdxTypography {...props} variant="h4" />,
  h5: (props: any) => <MdxTypography {...props} variant="h5" />,
  h6: (props: any) => <MdxTypography {...props} variant="h6" />,
  pre: (props: any) => <MdxTypography {...props} variant="pre" />,
  p: (props: any) => <MdxTypography {...props} />,
  a: (props: any) => <ButtonLink {...props} />,
  ul: (props: any) => <MdxUnorderedList {...props} />,
  ol: (props: any) => <MdxOrderedList {...props} />,
  li: (props: any) => <MdxListItem {...props} />,
};

export default MdxComponents;
