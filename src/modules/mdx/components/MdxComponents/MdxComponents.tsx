import CustomLink from '../CustomLink/CustomLink';
import MdxImage from '../MdxImage/MdxImage';
import { MdxOrderedList, MdxUnorderedList } from '../MdxList/MdxList';
import MdxListItem from '../MdxListItem/MdxListItem';
import MdxQuote from '../MdxQuote/MdxQuote';
import { MdxTypography } from '../MdxTypography/MdxTypography';
import MdxVideo from '../MdxVideo/MdxVideo';

const MdxComponents = {
  Image: MdxImage,
  h1: (props: any) => <MdxTypography {...props} variant="h1" />,
  h2: (props: any) => <MdxTypography {...props} variant="h2" />,
  h3: (props: any) => <MdxTypography {...props} variant="h3" />,
  h4: (props: any) => <MdxTypography {...props} variant="h4" />,
  h5: (props: any) => <MdxTypography {...props} variant="h5" />,
  h6: (props: any) => <MdxTypography {...props} variant="h6" />,
  pre: (props: any) => <MdxTypography {...props} variant="pre" />,
  p: (props: any) => <MdxTypography {...props} />,
  a: (props: any) => <CustomLink {...props} />,
  ul: (props: any) => <MdxUnorderedList {...props} />,
  ol: (props: any) => <MdxOrderedList {...props} />,
  li: (props: any) => <MdxListItem {...props} />,
  blockquote: MdxQuote,
  Video: MdxVideo,
};

export default MdxComponents;
