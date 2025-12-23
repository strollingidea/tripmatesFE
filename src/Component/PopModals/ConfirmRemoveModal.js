import React from 'react'
import './ConfirmRemoveModal.scss'

const ConfirmRemoveModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h2>Remove Tripmate</h2>
        <p>Are you sure you want to remove this tripmate?</p>

        <div className="confirm-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRemoveModal
