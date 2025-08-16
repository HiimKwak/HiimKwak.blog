const ROOT_CONTENT_LOCATION = "content_publish";

export const CONTENT_LOCATION = {
	diary: `${ROOT_CONTENT_LOCATION}/diary`,
	note: `${ROOT_CONTENT_LOCATION}/notes`,
};

export const NAV_PATH = {
	home: '/',
	post: '/post',
	notes: '/notes'
} as const