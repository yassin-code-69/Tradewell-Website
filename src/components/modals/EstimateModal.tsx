'use client';

import React, { useState, useRef } from 'react';
import { byId, CATEGORIES } from '@/data/tradewell';
import { Icon, XMarkIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function EstimateModal() {
  const { activeProId, closeModal, showToast } = useDirectory();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [details, setDetails] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isHover, setIsHover] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!activeProId) return null;
  const pro = byId(activeProId);
  if (!pro) return null;

  const currentService = service || pro.category;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).slice(0, 5);
      setFiles(selected);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHover(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      const dropped = Array.from(e.dataTransfer.files).slice(0, 5);
      setFiles(dropped);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = [];
    if (!name.trim()) missing.push('a name');
    if (!phone.trim()) missing.push('a phone number');
    if (!details.trim()) missing.push('a project description');

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
          <h3 id="modalTitle">Request an estimate</h3>
          <p>
            {pro.name} · {pro.area}
          </p>
        </div>
        <button className="modal__close" type="button" onClick={closeModal} aria-label="Close">
          <XMarkIcon />
        </button>
      </div>

      <form className="modal__body" onSubmit={handleSubmit} noValidate>
        <div className="notice">
          <Icon name="shield" />
          <span>
            <strong>Prototype form.</strong> Nothing is transmitted, stored or sent to any business, and no file is uploaded.
          </span>
        </div>
        <div style={{ height: '18px' }} />

        <div className="field__row">
          <div className="field">
            <label htmlFor="eName">Name *</label>
            <input
              id="eName"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={error && !name.trim() ? 'err' : ''}
            />
          </div>
          <div className="field">
            <label htmlFor="ePhone">Phone *</label>
            <input
              id="ePhone"
              type="tel"
              required
              placeholder="(870) 555-0134"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={error && !phone.trim() ? 'err' : ''}
            />
          </div>
        </div>

        <div className="field__row">
          <div className="field">
            <label htmlFor="eEmail">Email</label>
            <input
              id="eEmail"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="eService">Service</label>
            <select
              id="eService"
              value={currentService}
              onChange={(e) => setService(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="eDetails">Project description *</label>
          <textarea
            id="eDetails"
            required
            placeholder="What needs doing, and how soon?"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className={error && !details.trim() ? 'err' : ''}
          />
        </div>

        <div className="field">
          <label>Photos (optional)</label>
          <div
            className={`dropzone ${isHover ? 'is-hover' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsHover(true);
            }}
            onDragLeave={() => setIsHover(false)}
            onDrop={handleDrop}
          >
            <Icon name="box" />
            Drag photos here, or click to choose files
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <ul className="filelist">
              {files.map((f, idx) => (
                <li key={idx}>
                  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  {f.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="form-note">* Required fields</p>
        {error && <p className="form-error">{error}</p>}

        <div className="modal__foot" style={{ padding: '18px 0 0', borderTop: '1px solid var(--line)', marginTop: '20px' }}>
          <button className="btn btn--primary" type="submit">
            Send Request
          </button>
          <button className="btn btn--ghost" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
