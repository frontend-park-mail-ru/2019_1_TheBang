import EventBus from 'src/events/EventBus';
import PageEvents from 'src/events/PageEvents';
import Store from 'src/Store';
import * as View from 'src/views';
import NetworkEvents from 'src/events/NetworkEvents';
import Network from 'src/network/Network';
import GameNetworkEvents from 'src/events/GameNetworkEvents';
import GameNetwork from 'src/network/GameNetwork';
import GamePageEvents from 'src/events/GamePageEvents';
import Game from 'src/game/Game';
import GameEvents from 'src/events/GameEvents';

EventBus.on(PageEvents.UPDATE_STORE, Store.onUpdateUser.bind(Store));
EventBus.on(PageEvents.BASE_COMPONENTS_RENDER, View.BasePage.onRender);

EventBus.on(NetworkEvents.GET_USER, Network.onGetUser);

EventBus.on(NetworkEvents.SIGNUP, Network.onSignUpUser);
EventBus.on(PageEvents.SIGNUP_SUCCESS, View.SignUpPage.onSuccess);
EventBus.on(PageEvents.SIGNUP_ERROR, View.SignUpPage.onError);

EventBus.on(NetworkEvents.LOGIN, Network.onLoginUser);
EventBus.on(PageEvents.LOGIN_SUCCESS, View.LoginPage.onSuccess);
EventBus.on(PageEvents.LOGIN_ERROR, View.LoginPage.onError);

EventBus.on(NetworkEvents.UPDATE_PROFILE, Network.onUpdateUser);
EventBus.on(PageEvents.UPDATE_PROFILE_SUCCESS, View.ProfilePage.onSuccess);
EventBus.on(PageEvents.UPDATE_PROFILE_ERROR, View.ProfilePage.onError);

EventBus.on(NetworkEvents.LOGOUT, Network.onLogoutUser);
EventBus.on(PageEvents.LOGOUT_SUCCESS, View.HomePage.onSuccess);

EventBus.on(NetworkEvents.GET_LEADERBOARD, Network.onGetLeaderboard);
EventBus.on(PageEvents.GET_LEADERBOARD_SUCCESS, View.LeadersPage.onSuccess);
EventBus.on(PageEvents.GET_LEADERBOARD_ERROR, View.LeadersPage.onError);

EventBus.on(NetworkEvents.CHECK_LEADERBOARD, Network.onCheckPageLeaderboard);
EventBus.on(PageEvents.CHECK_LEADERBOARD_EXISTS, View.LeadersPage.onExistPage);
EventBus.on(PageEvents.CHECK_LEADERBOARD_NOT_EXISTS, View.LeadersPage.onNotExistPage);

EventBus.on(GameNetworkEvents.GET_ROOMS, GameNetwork.onGetRooms);
EventBus.on(GamePageEvents.GET_ROOMS_SUCCESS, View.GameLobbyPage.onSuccess);

EventBus.on(GameEvents.GAME_START, Game.start);