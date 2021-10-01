import React, { VideoHTMLAttributes } from 'react';

type Props = VideoHTMLAttributes<HTMLVideoElement>;
const MdxVideo = (props: Props) => {
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video tw="mt-md md:mt-xl w-full" {...props} controls />;
};

export default MdxVideo;
