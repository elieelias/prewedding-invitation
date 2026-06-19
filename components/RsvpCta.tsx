'use client';

import React, { useEffect, useState } from 'react';

interface RsvpData {
  name: string;
  attending: boolean;
  guests: number;
  message: string;
}

export default function RsvpCta() {
  const [rsvp, setRsvp] = useState<RsvpData | null>(null);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRsvpForm, setShowRsvpForm] = useState(false);

  // Load RSVP status from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('prewedding_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as RsvpData;
        setRsvp(parsed);
        setIsSubmitted(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) return;

    const data: RsvpData = {
      name: name.trim(),
      attending,
      guests: attending ? guests : 0,
      message: message.trim()
    };

    localStorage.setItem('prewedding_rsvp', JSON.stringify(data));
    setRsvp(data);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    if (rsvp) {
      setName(rsvp.name);
      setAttending(rsvp.attending);
      setGuests(rsvp.guests || 1);
      setMessage(rsvp.message);
    }
    setIsSubmitted(false);
    setShowRsvpForm(true);
  };

  const handleReset = () => {
    localStorage.removeItem('prewedding_rsvp');
    setRsvp(null);
    setName('');
    setAttending(null);
    setGuests(1);
    setMessage('');
    setIsSubmitted(false);
    setShowRsvpForm(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto select-none pt-4 pb-2 px-2">

      {/* 1. STATE: Guest has already submitted RSVP */}
      {isSubmitted && rsvp && (
        <div className="bg-white p-8 rounded-2xl border border-[#C2A677]/25 shadow-[0_12px_35px_rgba(30,86,105,0.06)] space-y-6 text-center gold-border-fancy animate-float">

          <div className="text-gold flex justify-center text-3xl">♥</div>

          <div className="space-y-2">
            <h4 className="font-serif text-lg tracking-widest text-teal-dark uppercase font-semibold">
              Thank You!
            </h4>
            <p className="font-sans text-[11px] tracking-wider text-teal-dark/75 uppercase font-medium">
              Your RSVP has been recorded.
            </p>
          </div>

          <div className="py-4 border-y border-[#C2A677]/25 max-w-xs mx-auto space-y-3 text-[11px] font-sans tracking-widest text-teal-dark uppercase font-bold bg-[#FCFAF6] rounded-xl px-4">
            <p className="text-[#C2A677]">Name: <span className="text-teal-dark font-black">{rsvp.name}</span></p>
            <p className="text-[#C2A677]">Response: <span className="text-teal-dark font-black">{rsvp.attending ? 'Attending' : 'Not Attending'}</span></p>
            {rsvp.attending && (
              <p className="text-[#C2A677]">Guests: <span className="text-teal-dark font-black">{rsvp.guests}</span></p>
            )}
          </div>

          <p className="font-sans text-[11px] leading-relaxed tracking-wider text-teal-dark/75 italic max-w-xs mx-auto">
            {rsvp.attending
              ? "We are so thrilled to celebrate with you! Get ready to dance."
              : "We will miss you, but thank you for letting us know."}
          </p>

          <div className="flex space-x-3 pt-2 justify-center">
            <button
              onClick={handleEdit}
              className="px-4 py-2.5 border border-gold/70 text-gold text-[9px] tracking-widest font-bold uppercase rounded-full transition-all hover:bg-gold hover:text-white active:scale-95"
            >
              Edit Reply
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 text-teal-dark/50 text-[9px] tracking-widest font-bold uppercase rounded-full hover:text-teal-dark/80 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 2. STATE: RSVP CTA Prompt (Before opening the form) */}
      {!isSubmitted && !showRsvpForm && (
        <div className="space-y-6 text-center">
          <div className="border-t border-[#C2A677]/30 w-16 mx-auto"></div>
          <div className="space-y-2">
            <p className="font-serif text-sm tracking-[0.2em] text-teal-dark uppercase font-bold">
              Save the date & join us
            </p>
            <p className="font-sans text-[10px] tracking-widest text-teal-light uppercase font-black">
              For an unforgettable night!
            </p>
          </div>

          {/* <button
            onClick={() => setShowRsvpForm(true)}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-teal-dark text-[#FCFAF6] text-[10px] tracking-[0.25em] font-bold uppercase rounded-full shadow-[0_6px_20px_rgba(30,86,105,0.15)] transition-all duration-300 hover:bg-[#153e4b] hover:shadow-[0_8px_25px_rgba(30,86,105,0.22)] hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>RSVP Online</span>
          </button>*/}
        </div>
      )}

      {/* 3. STATE: RSVP Form is Open */}
      {!isSubmitted && showRsvpForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl border border-[#C2A677]/25 shadow-[0_12px_35px_rgba(30,86,105,0.06)] text-left space-y-5 gold-border-fancy"
        >
          {/* Form Header */}
          <div className="text-center space-y-1">
            <h4 className="font-serif text-xl tracking-[0.3em] text-teal-dark uppercase font-semibold">
              R S V P
            </h4>
            <span className="font-sans text-[8px] tracking-[0.2em] text-gold uppercase font-bold block">
              Kindly reply by May 15, 2026
            </span>
          </div>

          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="guest-name" className="block font-sans text-[9px] tracking-widest text-teal-dark/65 uppercase font-bold">
              Full Name
            </label>
            <input
              id="guest-name"
              type="text"
              required
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-sans text-xs tracking-wider border border-[#C2A677]/30 focus:border-teal-dark focus:ring-1 focus:ring-teal-dark rounded-lg px-4 py-2.5 w-full bg-[#FCFAF6] text-teal-dark outline-none transition-all placeholder:text-teal-dark/30 font-semibold"
            />
          </div>

          {/* Attendance Toggle Cards */}
          <div className="space-y-1.5">
            <label className="block font-sans text-[9px] tracking-widest text-teal-dark/65 uppercase font-bold">
              Will you attend?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`py-3.5 rounded-lg border text-[10px] tracking-wider font-bold uppercase transition-all flex flex-col items-center justify-center space-y-1 ${attending === true
                    ? 'border-teal-dark bg-teal-dark text-[#FCFAF6] shadow-sm'
                    : 'border-[#C2A677]/30 text-teal-dark hover:border-teal-dark/50 bg-[#FCFAF6]'
                  }`}
              >
                <span>Gladly Attend</span>
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`py-3.5 rounded-lg border text-[10px] tracking-wider font-bold uppercase transition-all flex flex-col items-center justify-center space-y-1 ${attending === false
                    ? 'border-teal-dark bg-teal-dark text-[#FCFAF6] shadow-sm'
                    : 'border-[#C2A677]/30 text-teal-dark hover:border-teal-dark/50 bg-[#FCFAF6]'
                  }`}
              >
                <span>Regretfully Decline</span>
              </button>
            </div>
          </div>

          {/* Guest Count Field (Only shown if attending) */}
          {attending === true && (
            <div className="space-y-1.5 animate-fadeIn">
              <label htmlFor="guest-count" className="block font-sans text-[9px] tracking-widest text-teal-dark/65 uppercase font-bold">
                Number of Guests
              </label>
              <select
                id="guest-count"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="font-sans text-xs tracking-wider border border-[#C2A677]/30 focus:border-teal-dark focus:ring-1 focus:ring-teal-dark rounded-lg px-4 py-2.5 w-full bg-[#FCFAF6] text-teal-dark outline-none cursor-pointer font-bold"
              >
                <option value={1}>Just Me (1)</option>
                <option value={2}>Me + Guest (2)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
          )}

          {/* Message Field */}
          <div className="space-y-1.5">
            <label htmlFor="guest-message" className="block font-sans text-[9px] tracking-widest text-teal-dark/65 uppercase font-bold">
              Message for the Bride
            </label>
            <textarea
              id="guest-message"
              placeholder="Leave a lovely wish..."
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-sans text-xs tracking-wider border border-[#C2A677]/30 focus:border-teal-dark focus:ring-1 focus:ring-teal-dark rounded-lg px-4 py-2.5 w-full bg-[#FCFAF6] text-teal-dark outline-none transition-all placeholder:text-teal-dark/30 font-medium resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={attending === null || !name.trim()}
              className="w-full py-3.5 bg-teal-dark text-[#FCFAF6] text-[10px] tracking-[0.25em] font-bold uppercase rounded-lg shadow-md transition-all hover:bg-[#153e4b] hover:shadow-[0_4px_15px_rgba(30,86,105,0.25)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
            >
              Submit Response
            </button>

            <button
              type="button"
              onClick={() => setShowRsvpForm(false)}
              className="w-full py-2.5 text-teal-dark/50 text-[9px] tracking-widest font-bold uppercase rounded-lg hover:text-teal-dark/80 transition-colors text-center"
            >
              Cancel
            </button>
          </div>

        </form>
      )}

    </div>
  );
}