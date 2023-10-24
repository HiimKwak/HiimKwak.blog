import { useState } from 'react';
import {
  Target,
  UseIntersectionProps,
  UseIntersectionResult,
} from '@/src/types/Intersection';

const useIntersectionObserver = ({
  options,
  initialVisible = true,
}: UseIntersectionProps): UseIntersectionResult => {
  const [Target, setTarget] = useState<Target>(null);
  const [isIntersected, setIsIntersected] = useState(initialVisible);

  const observer = new IntersectionObserver(([entry]) => {
    setIsIntersected(entry.isIntersecting);
  }, options);

  Target && observer.observe(Target);

  const setTargetElement = (root: Target) => {
    setTarget(root);
  };

  return [setTargetElement, isIntersected];
};

export default useIntersectionObserver;
