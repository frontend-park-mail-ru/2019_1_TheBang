const PageEvents = {
	LOAD_PAGE: 'page:load-page',

	SIGNUP_SUCCESS: 'page:signup-user-success',
	SIGNUP_ERROR: 'page:signup-user-error',

	LOGIN_SUCCESS: 'page:login-user-success',
	LOGIN_ERROR: 'page:login-user-error',

	UPDATE_PROFILE_SUCCESS: 'page:update-user-success',
	UPDATE_PROFILE_ERROR: 'page:update-user-error',

	LOGOUT_SUCCESS: 'page:logout-user-success',

	GET_LEADERBOARD_SUCCESS: 'page:get-leaderboard-success',
	GET_LEADERBOARD_ERROR: 'page:get-leaderboard-error',
	CHECK_LEADERBOARD_EXISTS: 'page:check-leaderboard-exists',
	CHECK_LEADERBOARD_NOT_EXISTS: 'page:check-leaderboard-not-exists',

	BASE_COMPONENTS_RENDER: 'page:render-base-component',
	UPDATE_STORE: 'page:update-user-store',

	CREATE_CHAT_MESSAGES: 'page:create-chat-messages'
};

export default PageEvents