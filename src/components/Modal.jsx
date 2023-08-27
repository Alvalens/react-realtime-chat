import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ children, title, show, handleSubmit, handleClose, loading, disableButton }) => {
	return (
		<div
			className={
				show ? "modals show bg-gray-500 bg-opacity-50" : "modals hidden"
			}>
			<form onSubmit={handleSubmit}>
				<div className="modals-content bg-gray-200 dark:bg-gray-700 w-96 rounded-lg shadow-lg">
					<div className="modals-header px-4 py-2  rounded-t-lg flex justify-between items-center border-b border-gray-500">
						<h4 className="modals-title text-lg font-semibold text-gray-800 dark:text-gray-200">
							{title}
						</h4>
						<button
							className="close text-white px-4 py-2 bg-gray-400 dark:bg-gray-500 rounded hover:bg-red-700 hover:text-white "
							onClick={handleClose}
							type="button">
							&times;
						</button>
					</div>
					<div className="modals-body p-4 ">{children}</div>
					<div className="modals-footer p-4  rounded-b-lg flex justify-end">
						<button
							className="btn text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 "
							onClick={handleClose}
							type="button">
							Close
						</button>
						{loading ? (
							<button
								disabled
								className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-3">
								Loading...
								<FontAwesomeIcon
									icon={faCircleNotch}
									className="animate-spin ml-2"
								/>
							</button>
						) : (
							(disableButton &&
							<button
								disabled={!disableButton}
								type={`${!disableButton ? "button" : "submit"}`}
								className="btn text-black hover:text-white bg-gray-100 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-3 disabled:text-gray-600">
								Save
								<FontAwesomeIcon
									icon={faPaperPlane}
									className="ml-2"
								/>
							</button>)
						)}
					</div>
				</div>
			</form>
		</div>
	);
};
Modal.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	disableButton: PropTypes.bool,
};
export default Modal;
