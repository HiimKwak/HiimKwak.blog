import { useEffect, useState } from 'react';
import {
  Target,
  UseIntersectionProps,
  UseIntersectionResult,
} from '@/src/types/Intersection';

const useIntersectionObserver = ({
  options,
  initialVisible = true,
}: UseIntersectionProps): UseIntersectionResult => {
  const [target, setTarget] = useState<Target>(null);
  const [isIntersected, setIsIntersected] = useState(initialVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersected(entry.isIntersecting);
    }, options);

    target && observer.observe(target);

    return () => {
      target && observer.unobserve(target);
    };
  }, [target]);

  const setTargetElement = (root: Target) => {
    setTarget(root);
  };

  return [setTargetElement, isIntersected];
};

export default useIntersectionObserver;
