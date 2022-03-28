import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1>{t('elements.NotFound')}</h1>
    </div>
  );
};

export default NotFound;
