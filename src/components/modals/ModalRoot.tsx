'use client';

import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';
import { ProfileModal } from './ProfileModal';
import { EstimateModal } from './EstimateModal';
import { ContactModal } from './ContactModal';
import { JoinModal } from './JoinModal';

export function ModalRoot() {
  const { modalType, closeModal } = useDirectory();

  if (!modalType) return null;

  return (
    <div
      className="modal-backdrop is-open"
      id="modalBackdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        className={`modal ${modalType === 'profile' ? 'modal--wide' : ''}`}
        id="modal"
      >
        {modalType === 'profile' && <ProfileModal />}
        {modalType === 'estimate' && <EstimateModal />}
        {modalType === 'contact' && <ContactModal />}
        {modalType === 'join' && <JoinModal />}
      </div>
    </div>
  );
}
