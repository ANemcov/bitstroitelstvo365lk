import React from "react";

// eslint-disable-next-line react/prop-types
const ModalLauncher = ({ showModal, onSuccess, buttonCaption="OPenModal" }) => {
    return (
        <button
                    type="button"
                    className="btn btn-outline-primary mt-3"
                    onClick={showModal(onSuccess)}
                >
            {buttonCaption}
                </button>
    );
};

export default ModalLauncher;
