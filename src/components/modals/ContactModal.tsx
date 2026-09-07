'use client';

import React, { useState } from 'react';
import { byId } from '@/data/tradewell';
import { Icon, XMarkIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function ContactModal() {
  const { activeProId, closeModal, showToast } = useDirectory();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activeProId) return null;
  const pro = byId(activeProId);
  if (!pro) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = [];
    if (!name.trim()) missing.push('a name');
    if (!phone.trim()) missing.push('a phone number');
    if (!message.trim()) missing.push('a message');

    if (missing.length > 0) {
      setError(`Please add ${missing.join(', ')}.`);
      return;
    }

    setError('');
    setIsSuccess(true);
    showToast('Request captured — prototype only');
  };

  if (isSuccess) {
    return (
      <>
        <div className="modal__head">
          <div>
            <h3 id="modalTitle">Request Sent Successfully</h3>
          </div>
          <button className="modal__close" type="button" onClick={closeModal} aria-label="Close">
            <XMarkIcon />
          </button>
        </div>
        <div className="modal__body" style={{ textAlign: 'center', padding: '32px 26px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--green-lt)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 18px'
            }}
          >
            <svg className="ico ico--lg" viewBox="0 0 24 24" fill="none" stroke="#1B7A55" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15.5px', maxWidth: '46ch', margin: '0 auto 16px' }}>
            The professional will be contacted through the information provided.
          </p>
          <p className="form-note" style={{ maxWidth: '46ch', margin: '0 auto' }}>
            This is a prototype — nothing was actually sent to {pro.name}.
          </p>
        </div>
        <div className="modal__foot">
          <button className="btn btn--outline btn--block" type="button" onClick={closeModal}>
            Done
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="modal__head">
        <div>
          <h3 id="modalTitle">Contact {pro.name}</h3>
          <p>Send a message through the directory. Free, with no obligation to hire.</p>
        </div>
        <button className="modal__close" type="button" onClick={closeModal} aria-label="Close">
          <XMarkIcon />
        </button>
      </div>

      <form className="modal__body" onSubmit={handleSubmit} noValidate>
        <div className="notice">
          <Icon name="shield" />
          <span>
            <strong>Prototype form.</strong> Nothing is transmitted, stored or sent to any business.
          </span>
        </div>
        <div style={{ height: '18px' }} />

        <div className="field__row">
          <div className="field">
            <label htmlFor="cName">Name *</label>
            <input
              id="cName"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={error && !name.trim() ? 'err' : ''}
            />
          </div>
          <div className="field">
            <label htmlFor="cPhone">Phone *</label>
            <input
              id="cPhone"
              type="tel"
              required
              placeholder="(870) 555-0134"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={error && !phone.trim() ? 'err' : ''}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="cEmail">Email</label>
          <input
            id="cEmail"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cMessage">Message *</label>
          <textarea
            id="cMessage"
            required
            placeholder="Tell them what you need and when."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={error && !message.trim() ? 'err' : ''}
          />
        </div>

        <p className="form-note">* Required fields</p>
        {error && <p className="form-error">{error}</p>}

        <div className="modal__foot" style={{ padding: '18px 0 0', borderTop: '1px solid var(--line)', marginTop: '20px' }}>
          <button className="btn btn--primary" type="submit">
            Send Message
          </button>
          {pro.phone && (
            <a className="btn btn--outline" href={pro.phoneHref || `tel:${pro.phone}`}>
              Call {pro.phone}
            </a>
          )}
          <button className="btn btn--ghost" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
