import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

class GameWaitingPage extends ContentMixin {
	constructor(room) {
		super(GameAlertContent, 'Вы в комнате ' + room, 'Ожидание других игрков...');
	}
}

export default GameWaitingPage;