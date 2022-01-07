import { useRef, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const useBodyScrollLock = () => {
  const ref = useRef(null);

  const callbackRef = useCallback((node) => {
    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      disableBodyScroll(node);
    }

    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
      enableBodyScroll(ref.current);
    }
    // Save a reference to the node
    ref.current = node;
  }, []);

  return [callbackRef];
};

export default useBodyScrollLock;

// read: https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
// read: https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
