import Modal from "react-modal";
import check from "../../assets/cards/check.svg";

const SuitabilityModal = ({
	modalIsOpen,
	abilityToAssign,
	suitCards,
	selectedSuit,
	assignedAbilities,
	selectSuit,
	images,
	customStyles
}) => {
	return (
		<Modal isOpen={modalIsOpen} style={customStyles}>
			<p className="modal-header">{`Select ${abilityToAssign} suit`}</p>

			<div className="modal-content">
				{suitCards.map((card) => (
					<>
						<div className="img-container">
							{selectedSuit === card.charAt(0) && (
								<img
									src={check}
									alt="selected-suit"
									className="selected-suit-check"
								/>
							)}
							<img
								key={card}
								style={{
									cursor: `${
										Object.values(assignedAbilities).includes(card.charAt(0))
											? "not-allowed"
											: "pointer"
									}`,
									opacity: `${
										Object.values(assignedAbilities).includes(card.charAt(0))
											? "0.5"
											: "1"
									}`,
								}}
								className={`card ${
									selectedSuit === card.charAt(0) ? "img-overlay" : ""
								}`}
								src={images[`${card}.svg`]}
								alt={`card ${card}`}
								onClick={() => selectSuit(card.charAt(0))}
							/>
						</div>
					</>
				))}
			</div>
		</Modal>
	);
};

export default SuitabilityModal;
