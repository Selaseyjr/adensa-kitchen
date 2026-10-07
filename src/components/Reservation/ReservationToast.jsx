import React from 'react';
import { createPortal } from 'react-dom';
import { FiCheck } from 'react-icons/fi';

import './ReservationToast.css';

const VISIBLE_DURATION = 3200; // ms before the exit animation starts
const EXIT_DURATION = 350; // ms, matches the CSS exit animation

// Persistent polite live region: content injected while open is announced
// by screen readers without requiring any interaction. The toast dismisses
// itself; nothing is clickable and nothing blocks the page beneath it.
const ReservationToast = ({ open, onDismissed }) => {
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setLeaving(false);
      return undefined;
    }

    const timer = window.setTimeout(() => setLeaving(true), VISIBLE_DURATION);
    return () => window.clearTimeout(timer);
  }, [open]);

  React.useEffect(() => {
    if (!open || !leaving) return undefined;

    const timer = window.setTimeout(onDismissed, EXIT_DURATION);
    return () => window.clearTimeout(timer);
  }, [open, leaving, onDismissed]);

  // Portaled to <body> like the reservation dialog: fixed positioning must
  // resolve against the viewport, not against any transformed ancestor
  // (the [data-reveal] sections apply transforms while animating in).
  return createPortal(
    <div className="reservation-toast" role="status">
      {open && (
        <div
          className={`reservation-toast__inner${leaving ? ' reservation-toast__inner--leaving' : ''}`}
        >
          <span className="reservation-toast__icon" aria-hidden="true">
            <FiCheck />
          </span>
          <div className="reservation-toast__copy">
            <p className="reservation-toast__title">Reservation confirmed</p>
            <p className="reservation-toast__message">See you soon!</p>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default ReservationToast;
