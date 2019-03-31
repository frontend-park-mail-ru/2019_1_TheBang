const PageEvents = {
    GetUser: 'page:get-user',

    SignUpUserSuccess: 'page:signup-user-success',
    SignUpUserError: 'page:signup-user-error',

    LoginUserSuccess: 'page:login-user-success',
    LoginUserError: 'page:login-user-error',

    UpdateUserSuccess: 'page:update-user-success',
    UpdateUserError: 'page:update-user-error',

    LogoutUserSuccess: 'page:logout-user-success',

    GetLeaderboardSuccess: 'page:get-leaderboard-success',
    GetLeaderboardError: 'page:get-leaderboard-error',

    BaseRender: 'page:render-base-component',
    BaseRenderDone: 'page:render-base-component-done'
};

export default PageEvents