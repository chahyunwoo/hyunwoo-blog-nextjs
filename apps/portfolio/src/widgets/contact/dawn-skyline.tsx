export function DawnSkyline() {
  return (
    <div className="relative mt-12" style={{ height: '220px', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <svg
        viewBox="0 0 1440 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Dawn skyline illustration"
      >
        <title>Dawn skyline</title>

        {/* Horizon glow */}
        <ellipse cx="720" cy="220" rx="700" ry="50" fill="rgba(168,85,247,0.04)" />
        <ellipse cx="720" cy="220" rx="400" ry="30" fill="rgba(251,146,60,0.03)" />

        {/* Layer 1: Mountains (far back, very faint) y: 80~160 */}
        <polygon
          points="0,220 0,130 120,90 280,120 440,65 600,105 760,55 920,95 1080,60 1240,100 1440,80 1440,220"
          fill="rgba(255,255,255,0.02)"
        />

        {/* Layer 2: Hills (mid back) y: 120~180 */}
        <polygon
          points="0,220 0,160 180,130 360,150 540,120 720,145 900,115 1080,140 1260,125 1440,150 1440,220"
          fill="rgba(255,255,255,0.035)"
        />

        {/* Layer 3: Tall buildings (mid) y: 100~220 */}
        <rect x="200" y="100" width="24" height="120" rx="1" fill="rgba(255,255,255,0.055)" />
        <rect x="235" y="120" width="18" height="100" rx="1" fill="rgba(255,255,255,0.045)" />
        <rect x="600" y="95" width="28" height="125" rx="1" fill="rgba(255,255,255,0.055)" />
        <rect x="640" y="115" width="20" height="105" rx="1" fill="rgba(255,255,255,0.045)" />
        <rect x="1000" y="90" width="26" height="130" rx="1" fill="rgba(255,255,255,0.055)" />
        <rect x="1035" y="110" width="20" height="110" rx="1" fill="rgba(255,255,255,0.045)" />

        {/* Layer 4: Short buildings (front) y: 160~220 */}
        <rect x="80" y="170" width="35" height="50" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="350" y="165" width="40" height="55" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="760" y="168" width="38" height="52" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="1150" y="165" width="42" height="55" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="1320" y="170" width="34" height="50" rx="1" fill="rgba(255,255,255,0.07)" />

        {/* Houses with roofs */}
        <rect x="470" y="185" width="26" height="35" rx="1" fill="rgba(255,255,255,0.08)" />
        <polygon points="468,185 483,170 498,185" fill="rgba(255,255,255,0.08)" />

        <rect x="880" y="188" width="24" height="32" rx="1" fill="rgba(255,255,255,0.08)" />
        <polygon points="878,188 892,174 906,188" fill="rgba(255,255,255,0.08)" />

        {/* Windows on tall buildings */}
        <rect x="607" y="108" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.3)" />
        <rect x="614" y="108" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.15)" />
        <rect x="607" y="125" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.2)" />
        <rect x="1007" y="103" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.25)" />
        <rect x="1014" y="118" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.3)" />
        <rect x="207" y="113" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.2)" />
        <rect x="214" y="128" width="3" height="3" rx="0.5" fill="rgba(251,191,36,0.25)" />

        {/* Windows on houses */}
        <rect x="479" y="195" width="4" height="5" rx="0.5" fill="rgba(251,191,36,0.35)" />
        <rect x="487" y="195" width="4" height="5" rx="0.5" fill="rgba(251,191,36,0.2)" />
        <rect x="888" y="197" width="4" height="5" rx="0.5" fill="rgba(251,191,36,0.3)" />

        {/* Street lamps */}
        <rect x="550" y="180" width="2" height="40" fill="rgba(255,255,255,0.07)" />
        <rect x="546" y="178" width="10" height="2" rx="1" fill="rgba(255,255,255,0.07)" />
        <ellipse cx="551" cy="176" rx="5" ry="3" fill="rgba(251,191,36,0.1)" />

        <rect x="1250" y="182" width="2" height="38" fill="rgba(255,255,255,0.07)" />
        <rect x="1246" y="180" width="10" height="2" rx="1" fill="rgba(255,255,255,0.07)" />
        <ellipse cx="1251" cy="178" rx="5" ry="3" fill="rgba(251,191,36,0.1)" />

        {/* Ground */}
        <rect x="0" y="218" width="1440" height="2" fill="rgba(255,255,255,0.04)" />
      </svg>
    </div>
  )
}
