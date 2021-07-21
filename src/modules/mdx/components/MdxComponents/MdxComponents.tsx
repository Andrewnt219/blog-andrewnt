import dynamic from 'next/dynamic';
import { MdxTypography } from '../MdxTypography/MdxTypography';
const Example = dynamic(() => import('../Example/Example'));

const MdxComponents = {
  Example,
  h1: (props: any) => <MdxTypography {...props} variant="h1" />,
  h2: (props: any) => <MdxTypography {...props} variant="h2" />,
  h3: (props: any) => <MdxTypography {...props} variant="h3" />,
  h4: (props: any) => <MdxTypography {...props} variant="h4" />,
  h5: (props: any) => <MdxTypography {...props} variant="h5" />,
  h6: (props: any) => <MdxTypography {...props} variant="h6" />,
  pre: (props: any) => <MdxTypography {...props} variant="pre" />,
  p: (props: any) => <MdxTypography {...props} />,
};

export default MdxComponents;
