import React from 'react';

// eslint-disable-next-line react/prop-types
const Modal = ({ children, show, makeAction, hideModal , modalTitle="Вы уверены?"}) => (
    <div
        className={`modal ${show ? ' modal-show' : ''}`}
        tabIndex="-1"
        role="dialog"
    >
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{modalTitle}</h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={hideModal}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={makeAction}>
                        OK
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={hideModal}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default Modal;