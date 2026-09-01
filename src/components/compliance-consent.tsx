'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

type ConsentStatus = 'unknown' | 'accepted' | 'declined';
const CONSENT_KEY = 'ttt_cookie_consent';

export function ComplianceConsent() {
  const [consent, setConsent] = useState<ConsentStatus>('unknown');

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored);
      return;
    }
    setConsent('unknown');
  }, []);

  const setChoice = (choice: Exclude<ConsentStatus, 'unknown'>) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  };

  return (
    <>
      {consent === 'accepted' ? <Analytics /> : null}

      {consent === 'unknown' ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-700">
              We use optional analytics cookies to understand site performance. You can accept or decline non-essential tracking.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChoice('declined')}
                className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setChoice('accepted')}
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
