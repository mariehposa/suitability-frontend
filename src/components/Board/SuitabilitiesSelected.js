import {
	abilities
} from "../../utils";

const SuitabilitiesSelected = ({ cardImages, assignedAbilities }) => {
	const entries = Object.entries(assignedAbilities);
	return (
		<div style={{ display: "flex", textTransform: "capitalize"}}>
			{entries.length > 3 &&
				entries.map((e) => {
					const ability = e[0];
					const card = `${e[1]}13`;
					return (
						<div>
							<img
								key={card}
								
								className={`card`}
								src={
									cardImages[
										`${
											ability !== abilities.Privilege ? card : "BLUE_BACK"
										}.svg`
									]
								}
								alt={`card ${card}`}
							/>
							<p style={{ textAlign: "center" }}>
								{ability !== abilities.Privilege ? ability : e[1]}
							</p>
						</div>
					);
				})}
		</div>
	);
};

export default SuitabilitiesSelected
