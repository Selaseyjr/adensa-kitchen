import React from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

import SubHeading from '../SubHeading/SubHeading';

import './ReservationModal.css';

const TIME_OPTIONS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];

const GUEST_OPTIONS = Array.from({ length: 10 }, (_, index) => index + 1);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = {
  date: '',
  time: '',
  guests: '',
  name: '',
  email: '',
  phone: '',
  request: '',
};

const getTodayISO = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
};

const validators = {
  date: (value) => {
    if (!value) return 'Please choose a date.';
    if (value < getTodayISO()) return 'Please choose today or a future date.';
    return '';
  },
  time: (value) => (!value ? 'Please select a preferred time.' : ''),
  guests: (value) => (!value ? 'Please select the number of guests.' : ''),
  name: (value) => (value.trim() ? '' : 'Please enter your name.'),
  email: (value) => {
    if (!value.trim()) return 'Please enter your email address.';
    if (!EMAIL_PATTERN.test(value.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  },
};

const formatGuests = (count) => `${count} ${count === 1 ? 'Guest' : 'Guests'}`;

const Field = ({ id, label, optional, error, className, children }) => (
  <div className={`reservation__field${className ? ` ${className}` : ''}`}>
    <label className="reservation__label" htmlFor={id}>
      {label}
      {optional ? <span className="reservation__label-optional"> (optional)</span> : null}
    </label>
    {children}
    {error ? (
      <p className="reservation__error" id={`${id}-error`} role="alert">
        {error}
      </p>
    ) : null}
  </div>
);

const ReservationModal = ({ onClose, onConfirmed }) => {
  const [form, setForm] = React.useState(INITIAL_FORM);
  const [errors, setErrors] = React.useState({});

  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 60);
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]'
        )
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));

    setErrors((previous) => {
      if (!previous[name]) return previous;
      const validator = validators[name];
      return validator ? { ...previous, [name]: validator(value) } : previous;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    Object.entries(validators).forEach(([name, validator]) => {
      const message = validator(form[name]);
      if (message) nextErrors[name] = message;
    });

    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];

    if (firstInvalid) {
      dialogRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // No backend: nothing is submitted or transmitted anywhere. The parent
    // closes the dialog and shows a local confirmation toast.
    (onConfirmed ?? onClose)();
  };

  return createPortal(
    <div className="reservation" onClick={onClose}>
      <section
        className="reservation__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-heading"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="reservation__close"
          aria-label="Close reservation form"
          onClick={onClose}
        >
          <FiX aria-hidden="true" />
        </button>

        <div className="reservation__scroll">
          <>
              <SubHeading title="Reservations" />

              <h2 className="reservation__title" id="reservation-heading">
                Plan Your Visit
              </h2>

              <p className="p__opensans reservation__lede">
                Request a table at Adensa Kitchen and experience contemporary
                Ghanaian dining in the heart of Darmstadt.
              </p>

              <form className="reservation__form" onSubmit={handleSubmit} noValidate>
                <div className="reservation__grid">
                  <Field id="reservation-date" label="Date" error={errors.date}>
                    <input
                      id="reservation-date"
                      name="date"
                      type="date"
                      className="reservation__input"
                      min={getTodayISO()}
                      value={form.date}
                      onChange={handleChange}
                      aria-invalid={errors.date ? true : undefined}
                      aria-describedby={errors.date ? 'reservation-date-error' : undefined}
                    />
                  </Field>

                  <Field id="reservation-time" label="Preferred Time" error={errors.time}>
                    <select
                      id="reservation-time"
                      name="time"
                      className="reservation__input reservation__select"
                      value={form.time}
                      onChange={handleChange}
                      aria-invalid={errors.time ? true : undefined}
                      aria-describedby={errors.time ? 'reservation-time-error' : undefined}
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      {TIME_OPTIONS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="reservation-guests" label="Number of Guests" error={errors.guests}>
                    <select
                      id="reservation-guests"
                      name="guests"
                      className="reservation__input reservation__select"
                      value={form.guests}
                      onChange={handleChange}
                      aria-invalid={errors.guests ? true : undefined}
                      aria-describedby={errors.guests ? 'reservation-guests-error' : undefined}
                    >
                      <option value="" disabled>
                        Select guests
                      </option>
                      {GUEST_OPTIONS.map((count) => (
                        <option key={count} value={count}>
                          {formatGuests(count)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="reservation-name" label="Name" error={errors.name}>
                    <input
                      id="reservation-name"
                      name="name"
                      type="text"
                      className="reservation__input"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? 'reservation-name-error' : undefined}
                    />
                  </Field>

                  <Field id="reservation-email" label="Email" error={errors.email}>
                    <input
                      id="reservation-email"
                      name="email"
                      type="email"
                      className="reservation__input"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? 'reservation-email-error' : undefined}
                    />
                  </Field>

                  <Field id="reservation-phone" label="Phone" optional>
                    <input
                      id="reservation-phone"
                      name="phone"
                      type="tel"
                      className="reservation__input"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field
                    id="reservation-request"
                    label="Special Request"
                    optional
                    className="reservation__field--full"
                  >
                    <textarea
                      id="reservation-request"
                      name="request"
                      className="reservation__input reservation__textarea"
                      rows={3}
                      maxLength={300}
                      placeholder="Allergies, occasions, seating preferences"
                      value={form.request}
                      onChange={handleChange}
                    />
                  </Field>
                </div>

                <div className="reservation__actions">
                  <button type="submit" className="custom__button reservation__submit">
                    Request Reservation
                  </button>
                  <button type="button" className="reservation__cancel" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
        </div>
      </section>
    </div>,
    document.body
  );
};

export default ReservationModal;
