export type Target = Element | null;

export type UseIntersectionResult = [
  setRootElement: (root: Target) => void,
  isIntersected: boolean
];

export interface UseIntersectionProps {
  options?: IntersectionObserverInit;
  initialVisible?: boolean;
}
