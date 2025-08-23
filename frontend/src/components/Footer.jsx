import React from 'react';

const contributors = [
  { id: 1, name: 'Manu S', role: 'Developer', initials: 'MS', direction: 'left' },
  { id: 2, name: 'Bharat S', role: 'Developer', initials: 'BS', direction: 'right' },
  { id: 3, name: 'Deekshith S', role: 'Developer', initials: 'DG', direction: 'left' }
];

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-8 pb-4 flex flex-col items-center">
      {/* Contributors Section */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-cyan-400 rounded-full" />
          Contributors
          <span className="inline-block w-5 h-0.5 bg-cyan-400 rounded-full" />
        </h3>
        <div className="mb-4 text-gray-500 text-xs">Meet the team behind SecureX</div>
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 shadow-sm min-w-[160px] transition hover:shadow-md hover:border-cyan-400"
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold text-xs">
                {contributor.initials}
              </div>
              <div>
                <div className="text-gray-900 font-semibold text-sm">{contributor.name}</div>
                <div className="text-gray-500 text-xs">{contributor.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative line */}
      <div className="w-full border-t border-gray-100 mt-8 mb-2"></div>
      {/* Copyright & GitHub */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-gray-500 text-xs text-center">
        <span>
          © 2025 <span className="font-semibold text-cyan-600">deekshithgowda85</span>. All rights reserved.
        </span>
        <a
          href="https://github.com/deekshithgowda85/SecureX"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-0 md:ml-2 text-cyan-600 hover:underline flex items-center gap-1"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 18c-4.51 2-5-2-7-2" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          GitHub Repo
        </a>
      </div>
    </footer>
  );
}

export default Footer;