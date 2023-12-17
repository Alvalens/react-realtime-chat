import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
	collection,
	addDoc,
	updateDoc,
	serverTimestamp,
	startAfter,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	doc,
	deleteDoc,
	onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Loader from "../components/Loader";
import Group from "../components/Group";
import Modal from "../components/Modal";
import ModalUse from "../components/ModalUse";
import { Tooltip } from "react-daisyui";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faPoo } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
	const [selectedIcon, setSelectedIcon] = useState("");
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [isCreator, setIsCreator] = useState(false);
	useEffect(() => {
		const { uid } = auth.currentUser;
		if (selectedGroup && selectedGroup.uid === uid) {
			setIsCreator(true);
		} else {
			setIsCreator(false);
		}
	}, [selectedGroup]);

	const modal = ModalUse();

	const openIcon = () => {
		setOpen(!open);
	};

	const handleIconSelect = (iconName) => {
		setSelectedIcon(iconName);
		setOpen(false);
	};
	const handleRightClick = (event, group) => {
		event.preventDefault();
		setGroupName(group.name);
		setSelectedGroup(group);
		modal.openModal();
	};

	const startHoldTimer = (group) => {
		const timer = setTimeout(() => {
			setGroupName(group.name);
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
		if (!isCreator) {
			alert("You are not the creator of this group");
			return;
		}
		setLoading(true);

		const groupRef = collection(db, "groups");
		const queryRef = query(groupRef, where("name", "==", groupName));
		const querySnapshot = await getDocs(queryRef);
		// group name already exists except for the current group
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			if (doc.id !== selectedGroup.id) {
				alert("Group name already exists");
				setLoading(false);
				return;
			}
		}

		if (groupName != selectedGroup.name && selectedIcon) {
			try {
				const groupDocRef = doc(db, "groups", selectedGroup.id);
				const updateData = {
					name: groupName,
					icon: selectedIcon.iconName ?? "user-group",
				};

				await updateDoc(groupDocRef, updateData);
				setLoading(false);
				setOpen(false);
				modal.closeModal();
				setSelectedIcon(null);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		} else if (groupName == selectedGroup.name && selectedIcon) {
			try {
				const groupDocRef = doc(db, "groups", selectedGroup.id);
				const updateData = {
					icon: selectedIcon.iconName ?? "user-group",
				};

				await updateDoc(groupDocRef, updateData);
				setLoading(false);
				setOpen(false);
				modal.closeModal();
				setSelectedIcon(null);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		} else if (groupName != selectedGroup.name && !selectedIcon) {
			try {
				const groupDocRef = doc(db, "groups", selectedGroup.id);
				const updateData = {
					name: groupName,
				};

				await updateDoc(groupDocRef, updateData);
				setLoading(false);
				setOpen(false);
				modal.closeModal();
				setSelectedIcon(null);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		} else {
			alert("No changes made");
			setLoading(false);
			setOpen(false);
			modal.closeModal();
			setSelectedIcon(null);
		}
	};
	// delete
	const deleteGroup = async (id) => {
		if (!isCreator) {
			alert("You are not the creator of this group");
			return;
		}

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
		setSelectedIcon("");
		modal.closeModal();
	};

	return (
		<>
			<div className="group flex flex-col space-y-3">
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
					handleSubmit={updateGroup}
					disableButton={isCreator}>
					{/* creator */}
					<span className="text-gray-700 text-sm dark:text-gray-300">
						<span className="font-medium text-gray-500 dark:text-gray-400">
							Created By:{" "}
						</span>
						{selectedGroup.createdBy ?? " unknown"}
					</span>
					<br />
					<label
						htmlFor="group_name"
						className="text-gray-800 dark:text-gray-200 mt-3">
						Group Name
					</label>
					<input
						disabled={!isCreator}
						id="group_name"
						type="text"
						placeholder="Enter Group Name"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						className="input input-bordered min-w-[100%]"
					/>
					{isCreator && (
						<>
							<button
								type="button"
								onClick={openIcon}
								className="btn text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 my-3">
								Choose Icon
							</button>
							<ChooseIcon
								open={open}
								onSelect={handleIconSelect}
							/>
							{selectedIcon && (
								<div className="text-center bg-slate-400 dark:bg-slate-600 max-w-[40%] p-2 rounded-lg m-auto my-2">
									<FontAwesomeIcon
										icon={selectedIcon}
										className="text-3xl dark:text-white"
									/>
									<input type="hidden" value={selectedIcon} />
								</div>
							)}
							<div className="text-center">
								<button
									type="button"
									className="btn text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 my-4"
									onClick={() =>
										deleteGroup(selectedGroup.id)
									}>
									Delete Group
								</button>
							</div>
						</>
					)}
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
							className="text-3xl dark:text-white cursor-pointer hover:scale-125 transform transition-all duration-300 hover:text-blue-600"
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
		const name = auth.currentUser.displayName;
		await addDoc(collection(db, "groups"), {
			name: groupName,
			icon: selectedIcon.iconName ?? "user-group",
			createdBy: name,
			createdAt: serverTimestamp(),
			uid,
		});
		setGroupName("");
		setLoading(false);
		handleClose();
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
			loading={loading}
			disableButton="true">
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
				className="btn text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 my-3">
				Choose Icon
			</button>
			<ChooseIcon open={open} onSelect={handleIconSelect} />
			{selectedIcon && (
				<div className="text-center bg-slate-400 max-w-[40%] p-2 rounded-lg m-auto my-2">
					<FontAwesomeIcon
						icon={selectedIcon}
						className="text-3xl dark:text-white"
					/>
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
	const [currentPage, setCurrentPage] = useState(3);
	const handleCreateModal = ModalUse();
	const [IntersectionLoading, setIntersectionLoading] = useState(false);

	const handleIntersection = (entries) => {
		const target = entries[0];
		setTimeout(() => {}, 1000);
		if (target.isIntersecting && !IntersectionLoading) {
			loadMoreGroups();
		}
	};

	const loadMoreGroups = async () => {
		if (IntersectionLoading) {
			return;
		}
		setIntersectionLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const lastGroup = groups[groups.length - 1];
		const snapshot = await getDocs(
			query(
				collection(db, "groups"),
				orderBy("createdAt", "desc"),
				startAfter(lastGroup.createdAt),
				limit(3)
			)
		);
		const groupDocs = snapshot.docs;
		const promises = groupDocs.map(async (doc) => {
			const groupData = { ...doc.data(), id: doc.id };

			const queryRef = query(
				collection(db, "messages"),
				where("groupId", "==", groupData.id),
				limit(1),
				orderBy("createdAt", "desc")
			);

			const messagesSnapshot = await getDocs(queryRef);

			if (!messagesSnapshot.empty) {
				const lastMessageDoc = messagesSnapshot.docs[0];
				const lastMessage = lastMessageDoc.data().text;

				groupData.lastMessage =
					lastMessage.length > 50
						? lastMessage.substring(0, 50) + "..."
						: lastMessage;
				groupData.lastMessageUser = lastMessageDoc.data().name;
			}

			return groupData;
		});

		const resolvedGroups = await Promise.all(promises);
		setGroups((prevGroups) => [...prevGroups, ...resolvedGroups]);

		setCurrentPage(currentPage + 3);
		setIntersectionLoading(false);

		const load = document.querySelector(".load");
		if (load) {
			load.remove();
		}
	};

	useEffect(() => {
		if (authLoad || !user) {
			setLoading(false);
			return;
		}

		setLoading(true);
		const fetchData = async () => {
			try {
				const groupQuerySnapshot = await getDocs(
					query(
						collection(db, "groups"),
						orderBy("createdAt", "desc"),
						limit(10)
					)
				);

				const groupDocs = groupQuerySnapshot.docs;
				const promises = groupDocs.map(async (doc) => {
					const groupData = { ...doc.data(), id: doc.id };

					const messageQuerySnapshot = await getDocs(
						query(
							collection(db, "messages"),
							where("groupId", "==", groupData.id),
							limit(1),
							orderBy("createdAt", "desc")
						)
					);

					if (!messageQuerySnapshot.empty) {
						const lastMessageDoc = messageQuerySnapshot.docs[0];
						const lastMessage = lastMessageDoc.data().text;

						groupData.lastMessage =
							lastMessage.length > 50
								? lastMessage.substring(0, 50) + "..."
								: lastMessage;
						groupData.lastMessageUser = lastMessageDoc.data().name;
					}

					return groupData;
				});

				const resolvedGroups = await Promise.all(promises);
				setGroups(resolvedGroups);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [user, authLoad]);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } =
				document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight - 10) {
				const options = {
					root: null,
					rootMargin: "0px",
					threshold: 1.0,
				};

				const observer = new IntersectionObserver(
					handleIntersection,
					options
				);
				const target = document.querySelector(".group > :last-child");
				if (target) {
					observer.observe(target);
					console.log("Target Element:", target);
				} else {
					console.log("No Target Element");
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [groups]);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				const groupData = { ...change.doc.data(), id: change.doc.id };
				const index = groups.findIndex(
					(group) => group.id === groupData.id
				);
				if (change.type === "added" && index === -1) {
					console.log("Added group:", groupData);
					const queryRef = query(
						collection(db, "messages"),
						where("groupId", "==", groupData.id),
						limit(1),
						orderBy("createdAt", "desc")
					);

					getDocs(queryRef).then((messagesSnapshot) => {
						const lastMessageDoc = messagesSnapshot.docs[0];
						if (lastMessageDoc) {
							const lastMessage = lastMessageDoc.data().text;

							groupData.lastMessage =
								lastMessage.length > 50
									? lastMessage.substring(0, 50) + "..."
									: lastMessage;
							groupData.lastMessageUser =
								lastMessageDoc.data().name;
						}
						setGroups((prevGroups) => [groupData, ...prevGroups]);
					});
				} else if (change.type === "removed") {
					setGroups((prevGroups) => {
						const updatedGroups = prevGroups.filter(
							(group) => group.id !== groupData.id
						);
						return updatedGroups;
					});
					console.log("Removed group:", groupData);
				}
			});
		});

		return () => unsubscribe();
	}, []);

	if (authLoad || loading) {
		return <Loader />;
	} else if (!user) {
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-3xl font-semibold text-center">
					Please Login to Chat
				</h1>
			</div>
		);
	}
	if (IntersectionLoading) {
		// show first loading last child of group that have class name loading
		const loading = document.querySelector(".group > :last-child");
		const div = document.createElement("div");
		div.className =
			"load min-w-full min-h-[70px] flex justify-between items-center bg-slate-400 rounded-lg px-5 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out animate-pulse";
		if (loading) {
			loading.after(div);
		}
	} else {
		// remove last child of group that have class name loading
		const loading = document.querySelector(".group > :last-child");
		if (loading && loading.classList.contains("load")) {
			loading.remove();
		}
	}
	return (
		<>
			<div className="flex flex-col items-center justify-start min-h-[640px] bg-slate-200 dark:bg-gray-900 mt-24">
				<div className="header min-w-full">
					<div className="flex justify-center items-center">
						<h1 className="text-3xl font-bold mb-4 text-gray-700 text-center mt-3 dark:text-gray-200">
							Create a New Group
						</h1>
						{/* tips icon */}
						<div>
							<Tooltip
								color="blue"
								position="left"
								message="Hold or right click Group for more information">
								<button
									type="button"
									className="btn bg-gray-700 text-white rounded-lg ml-3"
									id="options-menu"
									aria-haspopup="true"
									aria-expanded="true">
									<FontAwesomeIcon icon={faInfoCircle} />
								</button>
							</Tooltip>
						</div>
					</div>
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
						<Loader />
					) : groups.length > 0 ? (
						<Groups data={groups} />
					) : (
						<div className="flex justify-center min-h-[32rem] items-center">
							<h1 className="text-2xl font-semibold text-center">
								No Groups yet
							</h1>
						</div>
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
