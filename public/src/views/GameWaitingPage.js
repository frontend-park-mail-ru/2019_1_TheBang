import GameWaitingContent from 'src/components/GameWaitingContent/GameWaitingContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

class GameWaitingPage extends ContentMixin {
	constructor(room) {
		super(GameWaitingContent, room);
	}
}

export default GameWaitingPage;