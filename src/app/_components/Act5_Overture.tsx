// src/app/_components/Act5_Overture.tsx
'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Act5_Overture() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="p-4 bg-glass border border-white/10 rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-accent" />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-4 bg-glass border border-white/10 rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-accent" />
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="p-4 bg-glass border border-white/10 rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" disabled={status === 'sending'} className="px-6 py-4 bg-accent text-background font-bold rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-cursor="pointer">
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {status === 'success' && <p className="text-center mt-4 text-green-400">Message sent successfully! We'll be in touch soon.</p>}
      {status === 'error' && <p className="text-center mt-4 text-red-400">Something went wrong. Please try again later.</p>}
    </div>
  );
}
