import React, { QuoteHTMLAttributes } from 'react';

type Props = QuoteHTMLAttributes<HTMLQuoteElement>;
const MdxQuote = (props: Props) => {
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <blockquote tw="ml-md italic text-textmuted" {...props} />;
};

export default MdxQuote;
