/**
 * Replaceable artwork and photographs. To use your own photos, drop new files into
 * src/assets and point these imports at them — every section updates automatically.
 */
import archDesktop from "@/assets/hero-arch-frame.webp";
import archMobile from "@/assets/hero-arch-frame-mobile.webp";
import couplePhoto from "@/assets/couple-portrait.webp";
import coupleIllustration from "@/assets/couple-watercolor.webp";
import ganesh from "@/assets/shri-ganesh-emblem.webp";

import kirtan from "@/assets/icons/kirtan.webp";
import shagun from "@/assets/icons/shagun.webp";
import haldi from "@/assets/icons/haldi.webp";
import ring from "@/assets/icons/ring.webp";
import jaggo from "@/assets/icons/jaggo.webp";
import mehndi from "@/assets/icons/mehndi.webp";
import sehra from "@/assets/icons/sehra.webp";
import baraat from "@/assets/icons/baraat.webp";
import anand from "@/assets/icons/anand.webp";

export const media = {
  /** Illustrated palace arch behind the hero. */
  heroFrame: { desktop: archDesktop, mobile: archMobile },
  /** Couple photograph shown inside the arch. */
  heroCouple: { src: couplePhoto, width: 1000, height: 1253 },
  /** Couple illustration in "Two hearts. Two families." */
  familyIllustration: { src: coupleIllustration, width: 900, height: 900 },
  ganesh: { src: ganesh, width: 229, height: 240 },
};

export const eventIcons = { kirtan, shagun, haldi, ring, jaggo, mehndi, sehra, baraat, anand };
