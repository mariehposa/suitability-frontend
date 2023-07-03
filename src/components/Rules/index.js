import React from "react";
import "./Rules.scss";

const Rules = () => {
	return (
		<div className="rules-container">
            <p className="heading">Game Rules</p>
			<p>
				Suitability is a trick-taking card game that can be played by 2 to 5
				players. Depending on the number of players, a specific set of cards
				will be used:
			</p>
			<ul>
				<li>
					For two players, the card numerals from 2 - 8 are used, making a total
					of 28 cards.
				</li>
				<li>
					For three players, the card numerals from 7 - 9 are removed, making a
					total of 40 cards.
				</li>
				<li>
					For four players, the entire deck of 52 cards is used without any
					jokers.
				</li>
				<li>
					For five players, three joker cards are added to a deck of 52 cards,
					making a total of 55 cards.
				</li>
			</ul>
			<ol>
				<li>
					To begin, the deck is shuffled and each player is dealt an even number
					of cards. The number of cards dealt to each player will vary based on
					the number of players in the game. With three players, after all cards
					have been dealt, the last remaining card is turned face up and becomes
					the suit for that trick.
				</li>
				<li>
					Before each round is started, the players starting from the left of
					the dealer, assign the Trump, Penalty and Reverse suits and the fourth
					(or fifth player) selects a privilege.
					<p className="subheading">Suits:</p>
					<ul>
						<li>Trump: Beats out all other cards</li>
						<li>Penalty: Reduces the score for a trick</li>
						<li>
							Reverse: Causes the cards in the suit to be ranked upside down
							(with 2 being highest and Ace being lowest)
						</li>
						<li>‘Plain: The last unassigned suit</li>
					</ul>
					<p className="subheading">Privileges:</p>
					<ul>
						<li>
							Immunity: The player will score 5 points for each trick they win,
							without considering any penalty cards in their tricks.
						</li>
						<li>
							Warranty: The player will receive a fixed score of 25 points,
							regardless of the number of tricks or penalty cards they win.
						</li>
						<li>
							Poverty: Instead of scoring based on the actual number of tricks
							they win, the player will earn points based on the difference
							between the number of tricks they won and five.
						</li>
					</ul>
					<p>
						When there are four players, each player, starting with the player
						to the left of the dealer, assigns a suit, leaving the fourth player
						to choose a privilege or pass.
					</p>
					<p>
						For two players, the non-dealer player assigns the Trump and Reverse
						suits, leaving the dealer to assign the Penalty suit and claim a
						privilege if they wish
					</p>
					<p>
						For three players, the players assign suits as normal with no player
						claiming a privilege.
					</p>
					<p>
						For five players, the players assign suits again as normal with the
						fourth player claiming a privilege or opting to pass, and thus
						allowing the fifth player to claim a privilege if they choose.
					</p>
					<p className="subheading">Note:</p>
					<p>
						With three players, after all suits have been assigned, the player
						with the plain or unassigned suit equivalent of the turned-up card
						switches that card out for the turned-up card unless the turned-up
						card belongs to the plain suit. To illustrate, ​​if the plain suit
						is Hearts and the turn-up is Nine of Clubs then whoever holds Nine
						of Hearts exchanges it for the Nine of Clubs.
					</p>
				</li>
				<li>
					The player to the left of the dealer goes first, and play continues
					clockwise. Each player must play a card from their hand during their
					turn, with the aim of winning the trick. A trick consists of one card
					played by each player in the game.
				</li>
				<li>
					The first player to play a card in each trick can play any card from
					their hand (unless there are three players and the suit of the trick
					has already been set by the last undealt card). The remaining players
					must then follow suit if they have a card of the same suit in their
					hand. If they don't have a card of the same suit, they can play any
					card from their hand.
				</li>
				<li>
					The highest card of the suit led wins the trick, unless a trump card
					is played. If a player does not have a card of the suit led but does
					have a trump card, they can play it instead. The highest trump card
					played wins the trick.
				</li>
				<li>
					After all tricks have been played, the points are tallied up.
					<p>
						Each player receives ten points for each trick they won during the
						game, divided by the number of penalty cards taken in that trick. If
						a player wins all tricks during a game, they are awarded an
						additional 10 points unless they are the fourth or fifth player and
						claimed a privilege.
					</p>
				</li>
			</ol>
			<p>
				The game continues until a predetermined number of rounds or until a
				player reaches a specific number of points, depending on the variation
				of the game being played.
			</p>
			<p>
				Players should try to win as many tricks as possible to earn the most
				points. It's also important to keep track of the cards played and the
				cards remaining in their own hand and other players' hands to make
				informed decisions about which card to play next. Players should also be
				aware of trump cards and use them strategically to win tricks. Remember,
				the player with the most points or tricks taken at the end of the game
				wins!
			</p>
		</div>
	);
};

export default Rules;
