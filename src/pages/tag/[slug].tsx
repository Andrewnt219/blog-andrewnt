import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import HeaderMeta from '@layouts/Meta/HeaderMeta';
import React, { ReactNode } from 'react';

const TagSlugPage = () => {
  return <h1 tw="text-h1">Comming soon</h1>;
};

TagSlugPage.getLayout = (page: ReactNode) => (
  <DefaultLayout>
    <HeaderMeta />

    {page}
  </DefaultLayout>
);

export default TagSlugPage;
