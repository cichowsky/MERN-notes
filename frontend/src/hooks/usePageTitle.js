import { useEffect } from 'react';

const usePageTitle = (title, deps = []) => {
  useEffect(() => {
    document.title = title;
  }, deps);
};

export default usePageTitle;
