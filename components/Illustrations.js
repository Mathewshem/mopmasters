// Decorative, brand-colored illustrations used in place of stock photography.
// Keeping imagery illustrative (rather than photographic) avoids licensing
// issues entirely — swap these for real photos of your team whenever you have them.

export function HeroIllustration(props) {
  return (
    <svg viewBox="0 0 480 480" fill="none" {...props}>
      <circle cx="240" cy="240" r="220" fill="#e1ecdf" />
      <circle cx="240" cy="240" r="220" fill="url(#heroGrad)" fillOpacity="0.55" />
      <defs>
        <linearGradient id="heroGrad" x1="20" y1="20" x2="460" y2="460" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4fa524" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3f7a34" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="240" cy="410" rx="150" ry="18" fill="#193416" fillOpacity="0.08" />

      {/* bucket */}
      <path d="M150 300h140l-14 100a14 14 0 0 1-14 12H178a14 14 0 0 1-14-12l-14-100Z" fill="#3f7a34" />
      <path d="M150 300h140l-4 26H154l-4-26Z" fill="#2f6127" />
      <path d="M170 300v-16a50 50 0 0 1 100 0v16" stroke="#193416" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="220" cy="300" rx="70" ry="14" fill="#6fbf3f" />

      {/* suds */}
      <circle cx="190" cy="292" r="10" fill="#fff" fillOpacity="0.8" />
      <circle cx="215" cy="286" r="14" fill="#fff" fillOpacity="0.85" />
      <circle cx="245" cy="290" r="9" fill="#fff" fillOpacity="0.8" />

      {/* mop leaning */}
      <rect x="330" y="90" width="10" height="230" rx="5" fill="#254e20" transform="rotate(8 330 90)" />
      <path
        d="M300 300c-6 22-6 40 8 46 16 6 40 2 46-16 4-12-2-24-14-30-14-6-32-6-40 0Z"
        fill="#f6f4ee"
        stroke="#c1d9bd"
        strokeWidth="4"
      />

      {/* spray bottle */}
      <g transform="translate(90 150)">
        <rect x="0" y="40" width="46" height="70" rx="8" fill="#6fbf3f" />
        <rect x="10" y="20" width="26" height="22" rx="4" fill="#4fa524" />
        <rect x="30" y="0" width="10" height="22" rx="3" fill="#193416" transform="rotate(30 30 0)" />
        <circle cx="23" cy="75" r="4" fill="#f6f4ee" />
      </g>

      {/* sparkles */}
      <g fill="#6fbf3f">
        <path d="M120 120c1.5 6 4.5 9 10.5 10.5-6 1.5-9 4.5-10.5 10.5-1.5-6-4.5-9-10.5-10.5 6-1.5 9-4.5 10.5-10.5Z" />
        <path d="M375 210c1.2 5 3.6 7.2 8.4 8.4-4.8 1.2-7.2 3.6-8.4 8.4-1.2-4.8-3.6-7.2-8.4-8.4 4.8-1.2 7.2-3.4 8.4-8.4Z" />
        <path d="M355 350c1 4.4 3.1 6.3 7.4 7.4-4.3 1.1-6.4 3-7.4 7.4-1-4.4-3.1-6.3-7.4-7.4 4.3-1.1 6.4-3 7.4-7.4Z" />
      </g>
    </svg>
  );
}

export function AboutIllustration(props) {
  return (
    <svg viewBox="0 0 480 360" fill="none" {...props}>
      <rect x="0" y="0" width="480" height="360" rx="24" fill="#193416" />
      <rect x="24" y="24" width="432" height="312" rx="16" fill="#254e20" />
      {/* window grid */}
      <g stroke="#3f7a34" strokeWidth="2">
        <path d="M24 120h432M24 220h432M160 24v312M320 24v312" />
      </g>
      {/* cleaner silhouette wiping glass */}
      <g transform="translate(70 70)">
        <circle cx="40" cy="20" r="16" fill="#6fbf3f" />
        <path d="M14 150c0-40 12-80 26-92 14 12 26 52 26 92" fill="#4fa524" />
        <rect x="52" y="60" width="46" height="20" rx="8" fill="#6fbf3f" transform="rotate(-18 52 60)" />
        <circle cx="100" cy="52" r="12" fill="#f6f4ee" opacity="0.9" />
      </g>
      {/* second cleaner with laptop desk */}
      <g transform="translate(280 150)">
        <rect x="-10" y="70" width="140" height="10" rx="4" fill="#3f7a34" />
        <rect x="10" y="30" width="60" height="40" rx="4" fill="#2f6127" />
        <circle cx="110" cy="10" r="14" fill="#6fbf3f" />
        <path d="M86 130c0-34 10-68 24-78 14 10 24 44 24 78" fill="#4fa524" />
      </g>
      {/* sparkle accents */}
      <g fill="#f6f4ee">
        <path d="M360 60c1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7 4-1 6-3 7-7Z" />
        <path d="M100 260c1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7 4-1 6-3 7-7Z" />
      </g>
    </svg>
  );
}

export function ContactIllustration(props) {
  return (
    <svg viewBox="0 0 480 400" fill="none" {...props}>
      <rect x="10" y="10" width="460" height="380" rx="24" fill="#e1ecdf" />
      <rect x="40" y="60" width="260" height="280" rx="16" fill="#193416" />
      <circle cx="170" cy="130" r="34" fill="#6fbf3f" />
      <path d="M110 300c0-58 26-108 60-120 34 12 60 62 60 120" fill="#4fa524" />
      <rect x="70" y="90" width="60" height="70" rx="10" fill="#3f7a34" transform="rotate(-12 70 90)" />
      <circle cx="88" cy="112" r="10" fill="#f6f4ee" />
      <g fill="#3f7a34">
        <path d="M350 60c1.5 6 4.5 9 10.5 10.5-6 1.5-9 4.5-10.5 10.5-1.5-6-4.5-9-10.5-10.5 6-1.5 9-4.5 10.5-10.5Z" />
        <path d="M400 200c1 4.4 3.1 6.3 7.4 7.4-4.3 1.1-6.4 3-7.4 7.4-1-4.4-3.1-6.3-7.4-7.4 4.3-1.1 6.4-3 7.4-7.4Z" />
      </g>
      <circle cx="380" cy="300" r="46" fill="#6fbf3f" fillOpacity="0.5" />
    </svg>
  );
}

const AVATAR_COLORS = ["#3f7a34", "#4fa524", "#254e20", "#6d9f63", "#2f6127"];

export function InitialAvatar({ name, className = "" }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colorIndex =
    name.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_COLORS.length;

  return (
    <div
      className={`flex items-center justify-center rounded-full font-display text-sm font-bold text-white ${className}`}
      style={{ backgroundColor: AVATAR_COLORS[colorIndex] }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
