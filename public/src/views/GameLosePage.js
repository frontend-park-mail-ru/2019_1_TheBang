import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

class GameLosePage extends ContentMixin {
	constructor() {
		super(GameAlertContent, 'Вы проиграли!', 'Не везет в игре, повезет в любви <3');
	}
}

export default GameLosePage;