// components
import { Avatar, Badge } from "react-daisyui";
import PropTypes from "prop-types";

const GroupName = ({ name, user, msg }) => {
	return (
		<div className="ml-3 py-2 flex flex-col justify-center items-start">
			<p className="text-xl text-slate-800 font-medium">{name}</p>
			{/* last message */}
			<p className="text-xs text-gray-500">
				{ user ? (
					<>
					<span className="font-bold">{user}: </span> {msg}
					</>
				) :
					(<span className="font-bold">No Messages Yet</span>)}
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

const Group = ({ name, user, msg, total }) => {
	return (
		<div className="min-w-full min-h-[70px] flex justify-between items-center bg-slate-300 rounded-lg px-5 py-2">
			<div className="flex">
				<Avatar
					src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					size="sm"
					shape="circle"
				/>
				<GroupName name={name} user={user} msg={msg} />
			</div>
			<TotalMsg total={total} />
		</div>
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
