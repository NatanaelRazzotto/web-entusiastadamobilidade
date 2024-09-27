// components/HeadMeta.js
import Head from 'next/head';

const HeadMeta = ({ title, description, image }) => {

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
    </Head>
  );
};

export default HeadMeta;
