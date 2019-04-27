import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

class GameWinnerPage extends ContentMixin {
	constructor() {
		super(GameAlertContent, 'Вы выиграли!');
	}
}

export default GameWinnerPage;