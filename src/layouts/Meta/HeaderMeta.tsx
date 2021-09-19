import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

export type Meta = {
  title?: string;
  description?: string;
  type?: string;
  thumbnail?: string;
  date?: Date;
};
type Props = {
  _meta?: Meta;
};
function HeaderMeta({ _meta }: Props) {
  const router = useRouter();
  const meta = {
    title: "Andrew Nguyen – Developer's blog.",
    description: `Frontend developer, JAM stack enthusiast, TypeScript lover.`,
    image: 'https://blog.andrewnt.dev/avatar.jpg',
    type: 'website',
    ..._meta,
  };
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta
        property="og:url"
        content={`https://blog.andrewnt.dev${router.asPath}`}
      />
      <link
        rel="canonical"
        href={`https://blog.andrewnt.dev${router.asPath}`}
      />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Andrew Nguyen's blog" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.thumbnail} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@andrewnt219" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.thumbnail} />
      {meta.date && (
        <meta
          property="article:published_time"
          content={meta.date.toISOString()}
        />
      )}
    </Head>
  );
}

export default HeaderMeta;
