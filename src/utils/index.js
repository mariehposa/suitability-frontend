export const socketConstants = {
	board: "currentBoard",
	activePlayer: "activePlayer",
    playerCards: "player cards",
	gameStart: "gameStart",
	playCard: "playCard",
	error: "error",
	playerScores: "playerScores",
	playerTricks: "playerTricks",
	chooseSuitability: "chooseSuitability",
	suitabilityChosen: "suitabilityChosen",
	createRoom: 'createRoom',
	joinRoom: 'joinRoom',
	connectedPlayers: 'connectedPlayers',

	
	connect: "connect",
	disconnect: "disconnect",
}

export const gameState = {
	ready: "ready",
	chooseMode: "choose_mode",
	inPlay: "in_play",
	selectSuitabilities: "select_suitabilities"
}

export const privileges = {
	Immunity: 'immunity',
	Warranty: 'warranty',
	Poverty: 'poverty',
	None: 'none'

}

export const abilities = {
	Trump: "Trump",
	Reverse: "Reverse",
	Penalty: "Penalty",
	// Privilege: "Privilege"
}