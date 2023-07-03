import React, { useState } from "react";
import Modal from "react-modal";
import check from "../../assets/cards/check.svg";
import { privileges } from "../../utils";

const PrivilegeModal = ({
	modalIsOpen,
	selectSuit,
	cardImages,
	customStyles,
}) => {
	const suitCards = ["BLUE_BACK", "BLUE_BACK", "BLUE_BACK", "RED_BACK"];
	const [selectedSuit, setSelectedSuit] = useState("");

	const privs = Object.keys(privileges);

	console.log(cardImages, "cardImages");

	return (
		<Modal isOpen={modalIsOpen} style={customStyles}>
			<p className="modal-header">{`Select Privilege or Pass`}</p>

			<div className="modal-content">
				{suitCards.map((card, index) => (
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
									cursor: `${"pointer"}`,
								}}
								className={`card ${
									selectedSuit === privs[index] ? "img-overlay" : ""
								}`}
								src={cardImages[`${card}.svg`]}
								alt={`card ${card}`}
								onClick={() => {
									setSelectedSuit(privs[index]);
									selectSuit(privileges[privs[index]]);
									console.log(privs[index], "priv");
								}}
							/>
							<p>{privileges[privs[index]]}</p>
						</div>
					</>
				))}
			</div>
		</Modal>
	);
};

export default PrivilegeModal;
