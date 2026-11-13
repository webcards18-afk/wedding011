/**
 * Replaceable artwork and photographs. To use your own photos, drop new files into
 * src/assets and point these imports at them — every section updates automatically.
 */
import archDesktop from "@/assets/hero-arch-frame.webp";
import archMobile from "@/assets/hero-arch-frame-mobile.png";
import coupleIllustration from "@/assets/couple-watercolor.png";
import ganesh from "@/assets/shri-ganesh-emblem.webp";

import kirtan from "@/assets/icons/kirtan.png";
import shagun from "@/assets/icons/shagun.png";
import haldi from "@/assets/icons/haldi.png";
import ring from "@/assets/icons/ring.png";
import jaggo from "@/assets/icons/jaggo.png";
import mehndi from "@/assets/icons/mehndi.png";
import sehra from "@/assets/icons/sehra.png";
import baraat from "@/assets/icons/baraat.png";
import celebration from "@/assets/icons/celebration.png";
import anand from "@/assets/icons/anand.png";

export const media = {
  /** Illustrated palace arch behind the hero. */
  heroFrame: { desktop: archDesktop, mobile: archMobile },
  /** Couple illustration in "Two hearts. Two families." */
  familyIllustration: { src: coupleIllustration, width: 1254, height: 1254 },
  ganesh: { src: ganesh, width: 229, height: 240 },
};

export const eventIcons = {
  kirtan,
  shagun,
  haldi,
  ring,
  jaggo,
  mehndi,
  sehra,
  baraat,
  celebration,
  anand,
};
