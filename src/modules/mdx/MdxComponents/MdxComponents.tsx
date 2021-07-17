import dynamic from 'next/dynamic';
const Example = dynamic(() => import('../Example/Example'));

const MdxComponents = {
  Example,
};

export default MdxComponents;
