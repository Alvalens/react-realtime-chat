import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
	collection,
	addDoc,
	updateDoc,
	serverTimestamp,
	onSnapshot,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	doc,
	deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Loader from "../components/Loader";
import Group from "../components/Group";
import Modal from "../components/Modal";
import ModalUse from "../components/ModalUse";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faPoo } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const checkIcon = (icon) => {
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
	return icon;
};
const Groups = ({ data }) => {
	const [holdTimer, setHoldTimer] = useState(null);
	const [groupName, setGroupName] = useState("");
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const modal = ModalUse();

	const openIcon = () => {
		setOpen(!open);
	};

	const handleIconSelect = (icon) => {
		setSelectedGroup((prevGroup) => ({
			...prevGroup,
			icon: icon,
		}));
		setOpen(false);
	};

	const handleRightClick = (event, group) => {
		event.preventDefault();
		console.log(`Right-clicked on group ${group}`);
		group.icon = checkIcon(group.icon);
		setGroupName(group.name);
		setSelectedGroup(group);
		modal.openModal();
	};

	const startHoldTimer = (group) => {
		const timer = setTimeout(() => {
			setSelectedGroup(group);
		}, 1000);
		setHoldTimer(timer);
		modal.openModal();
	};

	const clearHoldTimer = () => {
		clearTimeout(holdTimer);
		setHoldTimer(null);
	};

	// update group
	const updateGroup = async (event) => {
		event.preventDefault();
		if (groupName.trim() === "") {
			alert("Enter a valid group name");
			return;
		}
		setLoading(true);
		const { uid } = auth.currentUser;

		const groupRef = collection(db, "groups");
		const queryRef = query(groupRef, where("name", "==", groupName));
		const querySnapshot = await getDocs(queryRef);

		if (!querySnapshot.empty) {
			alert("Group name already exists");
			setLoading(false);
			return;
		}

		try {
			const groupDocRef = doc(db, "groups", selectedGroup.id);
			const updateData = {
				name: groupName,
				icon: selectedGroup.icon.iconName,
			};

			await updateDoc(groupDocRef, updateData);
			setLoading(false);
			setOpen(false);
			modal.closeModal();
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};
	// delete
	const deleteGroup = async (id) => {
		try {
			setLoading(true);
			await deleteDoc(doc(db, "groups", id));
			// also delete all messages where groupId === id
			const messagesQuery = query(
				collection(db, "messages"),
				where("groupId", "==", id)
			);
			const messagesSnapshot = await getDocs(messagesQuery);
			messagesSnapshot.forEach(async (doc) => {
				await deleteDoc(doc.ref);
			});
			setSelectedGroup(null);
			setLoading(false);
			modal.closeModal();
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	const handleClose = () => {
		setSelectedGroup(null);
		setGroupName("");
		modal.closeModal();
	};

	return (
		<>
			<div className="flex flex-col space-y-3">
				{data.map((group) => (
					<Link
						to={`/chat?groupId=${group.id}`}
						key={group.id}
						onContextMenu={(event) =>
							handleRightClick(event, group)
						}
						onMouseDown={() => startHoldTimer(group)}
						onMouseUp={clearHoldTimer}>
						<Group
							name={group.name}
							total={group.totalMessages ?? 0}
							user={group.lastMessageUser}
							msg={group.lastMessage}
							icon={group.icon}
						/>
					</Link>
				))}
			</div>
			{selectedGroup && (
				<Modal
					show={modal.isOpen}
					handleClose={handleClose}
					title="Group Information"
					loading={loading}
					handleSubmit={updateGroup}>
					<label htmlFor="group_name">Name</label>
					<input
						id="group_name"
						type="text"
						placeholder="Enter Group Name"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						className="input input-bordered min-w-[100%]"
					/>
					<button
						type="button"
						onClick={openIcon}
						className="btn text-black hover:text-white bg-gray-100 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3">
						Choose Icon
					</button>
					<ChooseIcon open={open} onSelect={handleIconSelect} />
					{selectedGroup.icon && (
						<div className="text-center bg-slate-400 max-w-[40%] p-2 rounded-lg m-auto my-2">
							<FontAwesomeIcon
								icon={selectedGroup.icon}
								className="text-3xl"
							/>
							<input type="hidden" value={selectedGroup.icon} />
						</div>
					)}
					<div className="text-center">
						<button
							type="button"
							className="btn text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 my-4"
							onClick={() => deleteGroup(selectedGroup.id)}>
							Delete Group
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

const ChooseIcon = ({ open, onSelect }) => {
	const iconOptions = [
		faBomb,
		faCode,
		faMugHot,
		faPoo,
		faBriefcase,
		faSchool,
	];

	return (
		<div
			className={`${
				open ? "block" : "hidden"
			} p-4 bg-slate-400 shadow-md rounded-lg min-w-fit`}>
			<div className="flex flex-col space-y-3 justify-center items-center">
				<div className="flex flex-row space-x-3">
					{iconOptions.map((icon) => (
						<FontAwesomeIcon
							key={icon.iconName}
							icon={icon}
							className="text-3xl cursor-pointer hover:scale-125 transform transition-all duration-300 hover:text-blue-600"
							onClick={() => onSelect(icon)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const CreateModal = ({ show, handleClose }) => {
	const [groupName, setGroupName] = useState("");
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState("");

	const createGroup = async (event) => {
		event.preventDefault();
		if (groupName.trim() === "") {
			alert("Enter a valid group name");
			return;
		}
		setLoading(true);
		const { uid } = auth.currentUser;
		await addDoc(collection(db, "groups"), {
			name: groupName,
			icon: selectedIcon.iconName,
			createdAt: serverTimestamp(),
			uid,
		});
		setGroupName("");
		setLoading(false);
		setOpen(false);
	};

	const openIcon = () => {
		setOpen(!open);
	};
	const handleIconSelect = (iconName) => {
		setSelectedIcon(iconName);
		setOpen(false);
	};

	return (
		<Modal
			title="Create a New Group"
			show={show}
			handleClose={handleClose}
			handleSubmit={createGroup}
			loading={loading}>
			<input
				type="text"
				placeholder="Enter Group Name"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
				className="input input-bordered min-w-[100%]"
			/>

			<button
				type="button"
				onClick={openIcon}
				className="btn text-black hover:text-white bg-gray-100 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3">
				Choose Icon
			</button>
			<ChooseIcon open={open} onSelect={handleIconSelect} />
			{selectedIcon && (
				<div className="text-center bg-slate-400 max-w-[40%] p-2 rounded-lg m-auto my-2">
					<FontAwesomeIcon icon={selectedIcon} className="text-3xl" />
					<input type="hidden" value={selectedIcon} />
				</div>
			)}
		</Modal>
	);
};

const ChatHome = () => {
	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState([]);
	const { user, loading: authLoad } = useAuth();

	// modal init
	const handleCreateModal = ModalUse();

	// get groups
	useEffect(() => {
		if (authLoad || !user) {
			setLoading(false);
			return;
		}

		setLoading(true);
		const unsubscribe = onSnapshot(
			collection(db, "groups"),
			async (snapshot) => {
				// Create an array of promises
				const promises = snapshot.docs.map(async (doc) => {
					const groupData = { ...doc.data(), id: doc.id };

					const queryRef = query(
						collection(db, "messages"),
						where("groupId", "==", groupData.id),
						limit(99),
						orderBy("createdAt", "desc")
					);

					const messagesSnapshot = await getDocs(queryRef);

					if (!messagesSnapshot.empty) {
						const lastMessageDoc = messagesSnapshot.docs[0];
						groupData.totalMessages = messagesSnapshot.size;
						groupData.lastMessage = lastMessageDoc.data().text;
						groupData.lastMessageUser = lastMessageDoc.data().name;
					}

					return groupData;
				});

				// Wait for all promises to resolve
				const resolvedGroups = await Promise.all(promises);
				setGroups(resolvedGroups);
				setLoading(false);
			}
		);

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, authLoad]);

	if (authLoad || loading) {
		return (
				<Loader />
		);
	} else if (!user) {
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-3xl font-semibold text-center">
					Please Login to Chat
				</h1>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center justify-start h-[640px] bg-slate-200 dark:bg-gray-900 mt-24">
				<div className="header min-w-full">
					<h1 className="text-3xl font-bold mb-4 text-center mt-3">
						Create a New Group
					</h1>
					{/* search and create button */}
					<div className="flex justify-center items-center">
						<button
							onClick={handleCreateModal.openModal}
							className="btn bg-gray-700 text-white px-4 py-2 rounded-lg ">
							Create Group
						</button>
					</div>
				</div>
				<div className="body p-4 w-full md:w-[700px] lg:w-[1100px]">
					{loading ? (
						<>
								<Loader />
						</>
					) : (
						<Groups data={groups} />
					)}
				</div>
				{/* modal */}
				<CreateModal
					show={handleCreateModal.isOpen}
					handleClose={handleCreateModal.closeModal}
				/>
			</div>
		</>
	);
};

export default ChatHome;
