import styles from "./hero-network.module.css";

const leftTrunk = "M-24 339H43C76 339 94 321 111 292L144 235C156 214 171 200 194 189L221 176C239 167 252 151 263 130L284 90C294 70 310 60 333 60H354";
const leftBranch = "M43 339C71 339 89 350 102 373L133 427C144 447 160 457 182 457H224";
const rightTrunk = "M505 121H439C410 121 392 133 377 158L350 204C339 223 323 235 301 243L275 252C250 261 233 276 222 299L201 340C189 364 171 375 145 375H119";
const rightBranch = "M301 243H365C388 243 403 257 403 280V305";

/** Decorative channel routes. Kept at the edges so the product stays central. */
export function HeroNetwork() {
  return (
    <div className={styles.network} aria-hidden="true">
      <svg
        className={`${styles.panel} ${styles.left}`}
        viewBox="0 0 480 700"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g className={styles.routes}>
          <path d={leftTrunk} />
          <path d="M144 235H207C231 235 246 246 256 266L269 293" />
          <path d="M194 189L158 153C146 141 139 124 139 107V64C139 44 128 32 109 32H75" />
          <path d="M111 292L70 251C56 237 49 220 49 200V147" />
          <path d={leftBranch} />
          <path d="M221 176H268C287 176 301 184 313 197L331 217" />
          <path d="M284 90L259 65C249 55 244 43 244 29V14" />
        </g>
        <g className={styles.faintRoutes}>
          <path d="M-20 94H27C46 94 58 106 58 125V147H49" />
          <path d="M133 427L104 456C91 469 85 485 85 503V554" />
        </g>
        <g className={styles.signals}>
          <path d={leftTrunk} pathLength="100" />
          <path d={leftBranch} pathLength="100" />
        </g>
        <g className={styles.nodes}>
          <circle cx="354" cy="60" r="2.3" />
          <circle cx="75" cy="32" r="2" />
          <circle cx="49" cy="147" r="2" />
          <circle cx="269" cy="293" r="2.3" />
          <circle cx="224" cy="457" r="2" />
          <circle cx="85" cy="554" r="1.7" />
          <circle cx="331" cy="217" r="1.8" />
          <circle cx="244" cy="14" r="1.8" />
        </g>
        <g className={styles.junctions}>
          <circle cx="194" cy="189" r="3" />
          <circle cx="111" cy="292" r="3" />
          <circle cx="43" cy="339" r="2.4" />
        </g>
        <g className={styles.rings}>
          <circle cx="194" cy="189" r="7" />
          <circle cx="111" cy="292" r="6.5" />
        </g>
      </svg>

      <svg
        className={`${styles.panel} ${styles.right}`}
        viewBox="0 0 480 700"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g className={styles.routes}>
          <path d={rightTrunk} />
          <path d="M377 158L349 130C336 117 329 100 329 81V37" />
          <path d={rightBranch} />
          <path d="M222 299L257 334C270 347 277 363 277 383V424" />
          <path d="M439 121V83C439 65 428 53 410 53H388" />
          <path d="M350 204H382C401 204 414 195 426 183L440 169" />
          <path d="M201 340H155C136 340 124 329 124 310V280" />
        </g>
        <g className={styles.faintRoutes}>
          <path d="M277 424V470C277 492 291 506 313 506H365" />
          <path d="M403 305L438 340C449 351 455 366 455 382V435" />
        </g>
        <g className={styles.signals}>
          <path d={rightTrunk} pathLength="100" />
          <path d={rightBranch} pathLength="100" />
        </g>
        <g className={styles.nodes}>
          <circle cx="329" cy="37" r="2" />
          <circle cx="388" cy="53" r="2" />
          <circle cx="119" cy="375" r="2.3" />
          <circle cx="403" cy="305" r="2.3" />
          <circle cx="277" cy="424" r="2" />
          <circle cx="365" cy="506" r="1.7" />
          <circle cx="455" cy="435" r="1.7" />
          <circle cx="440" cy="169" r="1.8" />
          <circle cx="124" cy="280" r="1.8" />
        </g>
        <g className={styles.junctions}>
          <circle cx="377" cy="158" r="2.8" />
          <circle cx="301" cy="243" r="3" />
          <circle cx="222" cy="299" r="2.4" />
        </g>
        <g className={styles.rings}>
          <circle cx="301" cy="243" r="7" />
          <circle cx="377" cy="158" r="6.5" />
        </g>
      </svg>
    </div>
  );
}
