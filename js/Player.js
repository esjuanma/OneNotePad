class Player {

	constructor (name, index) {
		this.index = index;
		this.name = name;
		this.isHand = index == 0;
		this.wons = 0;
		this.points = 0;
		this.isWinning = false;
	}

	updatePoints (playerRoundPoints) {
		this.points += playerRoundPoints * 1;
	}

	updateWons (playerRoundPoints) {
		this.wons += playerRoundPoints == 0 ? 1 : 0;
	}

	updateHand (isHand) {
		this.isHand = isHand;
	}

	updateWinning (isWinning) {
		this.isWinning = isWinning;
	}
}
export default Player;