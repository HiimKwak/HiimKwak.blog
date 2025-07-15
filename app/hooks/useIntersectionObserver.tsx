import { useEffect, useState } from "react";

type Target = Element | null;

export default function useIntersectionObserver({
	options,
	initialVisible = true,
}: {
	options?: IntersectionObserverInit;
	initialVisible?: boolean;
}): [setRootElement: (root: Target) => void, isIntersected: boolean] {
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
	}, [target, options]);

	const setTargetElement = (root: Target) => {
		setTarget(root);
	};

	return [setTargetElement, isIntersected];
}
