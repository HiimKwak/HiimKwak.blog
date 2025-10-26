export function setCookie(name: string, value: string, maxAge: number) {
	if (typeof window !== "undefined" && "cookieStore" in window) {
		const cookieStore = (
			window as {
				cookieStore?: {
					set: (options: {
						name: string;
						value: string;
						path: string;
						expires: number;
					}) => Promise<void>;
				};
			}
		).cookieStore;
		cookieStore
			?.set({
				name,
				value,
				path: "/",
				expires: Date.now() + maxAge * 1000,
			})
			.catch(() => {
				// Fallback to document.cookie if cookieStore fails
			});
	}
}
