// components
import { Badge } from "react-daisyui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faPoo } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

const GroupName = ({ name, user, msg }) => {
	return (
		<div className="ml-3 py-2 flex flex-col justify-center items-start">
			<p className="text-xl text-slate-800 dark:text-slate-200 font-medium">{name}</p>
			{/* last message */}
			<p className="text-xs text-gray-500 dark:text-gray-300">
				{user ? (
					<>
						<span className="font-bold">{user}: </span> {msg}
					</>
				) : (
					<span className="font-bold bg-gray-500 rounded-lg">No Messages Yet</span>
				)}
			</p>
		</div>
	);
};

const TotalMsg = ({ total }) => {
	if (total > 98) {
		total = "99+";
	}
	return (
		<div className="ml-3 py-2 flex flex-row justify-center items-center">
			<Badge color="neutral">
				<p className="text-sm">{total}</p>
			</Badge>
		</div>
	);
};

const Group = ({ name, user, msg, total, icon }) => {

	if (icon === "bomb") {
		icon = faBomb;
	} else if (icon === "code") {
		icon = faCode;
	} else if (icon === "mug-hot") {
		icon = faMugHot;
	} else if (icon === "poo") {
		icon = faPoo;
	} else if (icon === "briefcase") {
		icon = faBriefcase;
	} else if (icon === "school") {
		icon = faSchool;
	} else {
		icon = faUserGroup;
	}


	return (
		<>
			<div className="min-w-full min-h-[70px] flex justify-between items-center bg-slate-300 rounded-lg px-5 py-2 hover:bg-slate-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out">
				<div className="flex">
					{/* icon */}
					<div className="flex justify-center items-center">
						<div
							className="bg-slate-200 dark:bg-slate-500 dark:text-slate-200 rounded-full w-16 h-16 flex justify-center items-center ">
							<FontAwesomeIcon
								icon={icon ?? faUserGroup}
								className={`text-2xl`}
							/>
						</div>
						<GroupName name={name} user={user} msg={msg} />
					</div>
				</div>
				<TotalMsg total={total} />
			</div>
		</>
	);
};
GroupName.propTypes = {
	name: PropTypes.string,
	user: PropTypes.string,
	msg: PropTypes.string,
};
TotalMsg.propTypes = {
	total: PropTypes.number,
};
Group.propTypes = {
	name: PropTypes.string,
	user: PropTypes.string,
	msg: PropTypes.string,
	total: PropTypes.number,
};
export default Group;
