import { useEffect, useState } from 'react';

export const useCurrentLocation = (): string => {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  return location;
};
