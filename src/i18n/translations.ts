import type { EventId } from "@/config/events";
import type { VenueId } from "@/config/venues";
import type { PersonKey, RelationKey } from "@/config/contacts";

export type Lang = "en" | "hi" | "hinglish";

export const languages: { code: Lang; label: string; htmlLang: string }[] = [
  { code: "en", label: "English", htmlLang: "en" },
  { code: "hi", label: "हिंदी", htmlLang: "hi" },
  { code: "hinglish", label: "Hinglish", htmlLang: "en-IN" },
];

interface EventCopy {
  name: string;
  time: string;
  description: string;
  /** Overrides the venue line, e.g. "Departure from …". */
  venueNote?: string;
  dress?: string;
}

interface VenueCopy {
  name: string;
  sub?: string;
  address: string;
}

export interface Dictionary {
  meta: { languageLabel: string };
  couple: { groom: string; bride: string; amp: string };
  people: Record<PersonKey, string>;
  relations: Record<RelationKey, string>;
  calendar: { months: string[]; weekdays: string[] };
  hero: { invited: string; toTheWedding: string; dates: string; place: string; scroll: string };
  countdown: {
    eyebrow: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    target: string;
    done: string;
  };
  families: {
    eyebrow: string;
    title: string;
    sonOf: string;
    daughterOf: string;
    and: string;
    closing: string;
    hostedBy: string;
    host: string;
  };
  celebrations: {
    eyebrow: string;
    title: string;
    subtitle: [string, string];
    venue: string;
    dress: string;
    provisional: string;
    venuesLink: string;
  };
  events: Record<EventId, EventCopy>;
  venuesSection: { eyebrow: string; title: string; eventsHere: string; directions: string };
  venues: Record<VenueId, VenueCopy>;
  contactsSection: {
    eyebrow: string;
    title: string;
    intro: string;
    bridesSide: string;
    groomsSide: string;
    whatsapp: string;
    pending: string;
    message: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    dates: string;
    hashtags: string;
    backToTop: string;
  };
  footer: { language: string; withLove: string; address: string };
}

const en: Dictionary = {
  meta: { languageLabel: "Language" },
  couple: { groom: "Abhimanyu", bride: "Aashi", amp: "&" },
  people: {
    vaishali: "Mrs. Vaishali Saidha",
    deepak: "Mr. Deepak Saidha",
    sanya: "Mrs. Sanya Narula",
    sanjeev: "Mr. Sanjeev Narula",
  },
  relations: {
    fatherOfGroom: "Father of the Groom",
    motherOfGroom: "Mother of the Groom",
    fatherOfBride: "Father of the Bride",
    motherOfBride: "Mother of the Bride",
  },
  calendar: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  hero: {
    invited: "With love, you are invited",
    toTheWedding: "To the wedding of",
    dates: "7 – 13 December 2026",
    place: "Ludhiana & Moga · Punjab",
    scroll: "Scroll",
  },
  countdown: {
    eyebrow: "Until we say forever",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    target: "Anand Karaj · 13 December 2026 · 4:00 AM IST",
    done: "Forever has begun.",
  },
  families: {
    eyebrow: "With the blessings of God and our parents",
    title: "Two hearts. Two families.",
    sonOf: "Son of",
    daughterOf: "Daughter of",
    and: "&",
    closing: "Together with our families, we invite you to our wedding.",
    hostedBy: "Hosted by",
    host: "The Saidha Family",
  },
  celebrations: {
    eyebrow: "Come, be part of our story",
    title: "The celebrations",
    subtitle: ["A little tradition, a little music,", "and a whole lot of love."],
    venue: "Venue",
    dress: "Dress theme",
    provisional: "Provisional date · to be confirmed by the family",
    venuesLink: "Nine celebrations, four beautiful places.",
  },
  events: {
    kirtan: {
      name: "Kirtan & Satsang",
      time: "3:00 PM – 5:00 PM",
      description: "Begin the celebrations with devotional music, prayers and blessings.",
    },
    shagun: {
      name: "Shagun",
      time: "11:00 AM – 1:00 PM",
      description: "Blessings and shagun exchanged as our two families come together.",
    },
    haldi: {
      name: "Haldi",
      time: "2:00 PM – 3:30 PM",
      description: "A golden celebration filled with laughter, traditions and love.",
    },
    ring: {
      name: "Ring Ceremony & Cocktail",
      time: "8:00 PM onwards",
      description: "An elegant evening celebrating a beautiful promise and a new beginning.",
    },
    jaggo: {
      name: "Jaggo Night",
      time: "7:00 PM onwards",
      description: "A lively Punjabi celebration with dhol, music, dancing and festive traditions.",
    },
    mehndi: {
      name: "Saant & Mehndi",
      time: "12:00 PM onwards",
      description: "A beautiful celebration of traditions, mehndi and family blessings.",
    },
    sehra: {
      name: "Sehra Bandi",
      time: "4:00 PM",
      description: "The sehra is tied with love as the family showers the groom with blessings.",
    },
    baraat: {
      name: "Departure of Baraat",
      time: "6:00 PM",
      description: "The beginning of the grand wedding celebration.",
      venueNote: "Departure from Saidha Family Residence",
    },
    anand: {
      name: "Anand Karaj",
      time: "4:00 AM",
      description: "With the blessings of Waheguru, two souls begin their journey together.",
    },
  },
  venuesSection: {
    eyebrow: "Where we celebrate together",
    title: "The venues",
    eventsHere: "Celebrations here",
    directions: "Get directions",
  },
  venues: {
    martini: {
      name: "Martini in the Clouds",
      sub: "Hotel Maharaja Regency",
      address: "Ferozepur Road, Ludhiana, Punjab",
    },
    regency: { name: "Maharaja Regency", address: "Ferozepur Road, Ludhiana, Punjab" },
    residence: {
      name: "Saidha Family Residence",
      address: "House No. 117, Apple Villa, Ludhiana, Punjab",
    },
    taj: { name: "Hotel Taj", address: "Moga, Punjab" },
  },
  contactsSection: {
    eyebrow: "A little help from our families",
    title: "We are here for you",
    intro:
      "For travel, stay or anything you need during the celebrations, our families are a message away.",
    bridesSide: "Bride's side",
    groomsSide: "Groom's side",
    whatsapp: "WhatsApp",
    pending: "Number to be shared soon",
    message: "Hello! I have a question about Abhimanyu & Aashi's wedding.",
  },
  closing: {
    eyebrow: "With love, from us",
    title: "See you at the wedding.",
    dates: "7 – 13 December 2026 · Ludhiana & Moga",
    hashtags: "Share your moments",
    backToTop: "Back to top",
  },
  footer: {
    language: "Language",
    withLove: "With love, the Saidha Family",
    address: "House No. 117, Apple Villa, Ludhiana, Punjab",
  },
};

const hi: Dictionary = {
  meta: { languageLabel: "भाषा" },
  couple: { groom: "अभिमन्यु", bride: "आशी", amp: "&" },
  people: {
    vaishali: "श्रीमती वैशाली सैधा",
    deepak: "श्री दीपक सैधा",
    sanya: "श्रीमती सान्या नरूला",
    sanjeev: "श्री संजीव नरूला",
  },
  relations: {
    fatherOfGroom: "वर के पिता",
    motherOfGroom: "वर की माता",
    fatherOfBride: "वधू के पिता",
    motherOfBride: "वधू की माता",
  },
  calendar: {
    months: [
      "जनवरी",
      "फ़रवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ],
    weekdays: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
  },
  hero: {
    invited: "प्रेम सहित, आप सादर आमंत्रित हैं",
    toTheWedding: "शुभ विवाह",
    dates: "7 – 13 दिसंबर 2026",
    place: "लुधियाना एवं मोगा · पंजाब",
    scroll: "नीचे देखें",
  },
  countdown: {
    eyebrow: "हमेशा के लिए एक होने तक",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    target: "आनंद कारज · 13 दिसंबर 2026 · प्रातः 4:00 बजे",
    done: "हमेशा का साथ शुरू हो गया।",
  },
  families: {
    eyebrow: "ईश्वर एवं माता-पिता के आशीर्वाद से",
    title: "दो दिल। दो परिवार।",
    sonOf: "सुपुत्र",
    daughterOf: "सुपुत्री",
    and: "एवं",
    closing: "अपने परिवारों के साथ, हम आपको अपने विवाह में सादर आमंत्रित करते हैं।",
    hostedBy: "निवेदक",
    host: "सैधा परिवार",
  },
  celebrations: {
    eyebrow: "आइए, हमारी कहानी का हिस्सा बनिए",
    title: "उत्सव",
    subtitle: ["थोड़ी परंपरा, थोड़ा संगीत,", "और ढेर सारा प्यार।"],
    venue: "स्थान",
    dress: "पोशाक थीम",
    provisional: "अस्थायी तिथि · परिवार द्वारा पुष्टि की जानी है",
    venuesLink: "नौ समारोह, चार सुंदर स्थल।",
  },
  events: {
    kirtan: {
      name: "कीर्तन एवं सत्संग",
      time: "दोपहर 3:00 – शाम 5:00",
      description: "भक्ति संगीत, प्रार्थना और आशीर्वाद के साथ उत्सवों का शुभारंभ।",
    },
    shagun: {
      name: "शगुन",
      time: "सुबह 11:00 – दोपहर 1:00",
      description: "दोनों परिवारों के मिलन पर आशीर्वाद और शगुन का आदान-प्रदान।",
    },
    haldi: {
      name: "हल्दी",
      time: "दोपहर 2:00 – 3:30",
      description: "हँसी, परंपराओं और प्यार से भरा एक सुनहरा उत्सव।",
    },
    ring: {
      name: "रिंग सेरेमनी एवं कॉकटेल",
      time: "रात 8:00 बजे से",
      description: "एक सुंदर वचन और नई शुरुआत का जश्न मनाती एक शानदार शाम।",
    },
    jaggo: {
      name: "जागो नाइट",
      time: "शाम 7:00 बजे से",
      description: "ढोल, संगीत, नृत्य और उत्सवी परंपराओं से सजी एक जोशीली पंजाबी शाम।",
    },
    mehndi: {
      name: "सांत एवं मेहंदी",
      time: "दोपहर 12:00 बजे से",
      description: "परंपराओं, मेहंदी और पारिवारिक आशीर्वाद का एक सुंदर उत्सव।",
    },
    sehra: {
      name: "सेहरा बंदी",
      time: "शाम 4:00 बजे",
      description: "प्यार से सेहरा बाँधा जाता है और परिवार दूल्हे पर आशीर्वाद बरसाता है।",
    },
    baraat: {
      name: "बारात प्रस्थान",
      time: "शाम 6:00 बजे",
      description: "भव्य विवाह उत्सव की शुरुआत।",
      venueNote: "सैधा परिवार निवास से प्रस्थान",
    },
    anand: {
      name: "आनंद कारज",
      time: "प्रातः 4:00 बजे",
      description: "वाहेगुरु जी के आशीर्वाद से, दो आत्माएँ अपनी साझा यात्रा आरंभ करती हैं।",
    },
  },
  venuesSection: {
    eyebrow: "जहाँ हम साथ मिलकर जश्न मनाएँगे",
    title: "समारोह स्थल",
    eventsHere: "यहाँ होने वाले समारोह",
    directions: "रास्ता देखें",
  },
  venues: {
    martini: {
      name: "मार्टिनी इन द क्लाउड्स",
      sub: "होटल महाराजा रीजेंसी",
      address: "फ़िरोज़पुर रोड, लुधियाना, पंजाब",
    },
    regency: { name: "महाराजा रीजेंसी", address: "फ़िरोज़पुर रोड, लुधियाना, पंजाब" },
    residence: { name: "सैधा परिवार निवास", address: "मकान नं. 117, एप्पल विला, लुधियाना, पंजाब" },
    taj: { name: "होटल ताज", address: "मोगा, पंजाब" },
  },
  contactsSection: {
    eyebrow: "हमारे परिवारों की ओर से थोड़ी मदद",
    title: "हम आपके लिए यहाँ हैं",
    intro: "यात्रा, ठहरने या उत्सवों के दौरान किसी भी ज़रूरत के लिए, हमारे परिवार बस एक संदेश की दूरी पर हैं।",
    bridesSide: "वधू पक्ष",
    groomsSide: "वर पक्ष",
    whatsapp: "व्हाट्सऐप",
    pending: "नंबर जल्द साझा किया जाएगा",
    message: "नमस्ते! अभिमन्यु और आशी के विवाह के बारे में मेरा एक प्रश्न है।",
  },
  closing: {
    eyebrow: "प्रेम सहित, हमारी ओर से",
    title: "विवाह में आपसे मिलेंगे।",
    dates: "7 – 13 दिसंबर 2026 · लुधियाना एवं मोगा",
    hashtags: "अपने पल साझा करें",
    backToTop: "ऊपर जाएँ",
  },
  footer: {
    language: "भाषा",
    withLove: "सप्रेम, सैधा परिवार",
    address: "मकान नं. 117, एप्पल विला, लुधियाना, पंजाब",
  },
};

const hinglish: Dictionary = {
  meta: { languageLabel: "Bhasha" },
  couple: { groom: "Abhimanyu", bride: "Aashi", amp: "&" },
  people: en.people,
  relations: {
    fatherOfGroom: "Dulhe ke Papa",
    motherOfGroom: "Dulhe ki Mummy",
    fatherOfBride: "Dulhan ke Papa",
    motherOfBride: "Dulhan ki Mummy",
  },
  calendar: en.calendar,
  hero: {
    invited: "Pyaar ke saath, aap invited hain",
    toTheWedding: "Shaadi hai",
    dates: "7 – 13 December 2026",
    place: "Ludhiana & Moga · Punjab",
    scroll: "Scroll karein",
  },
  countdown: {
    eyebrow: "Hamesha ke liye ek hone tak",
    days: "Din",
    hours: "Ghante",
    minutes: "Minute",
    seconds: "Second",
    target: "Anand Karaj · 13 December 2026 · Subah 4:00 baje",
    done: "Hamesha ka saath shuru ho gaya.",
  },
  families: {
    eyebrow: "Rab aur maa-baap ke aashirwaad se",
    title: "Do dil. Do parivaar.",
    sonOf: "Suputra",
    daughterOf: "Suputri",
    and: "&",
    closing: "Apne parivaaron ke saath, hum aapko apni shaadi mein dil se invite karte hain.",
    hostedBy: "Aapke intezaar mein",
    host: "Saidha Parivaar",
  },
  celebrations: {
    eyebrow: "Aaiye, hamari kahaani ka hissa baniye",
    title: "Jashn",
    subtitle: ["Thodi parampara, thoda sangeet,", "aur dher saara pyaar."],
    venue: "Venue",
    dress: "Dress theme",
    provisional: "Provisional date · parivaar confirm karega",
    venuesLink: "Nau function, chaar khoobsurat jagah.",
  },
  events: {
    kirtan: {
      name: "Kirtan & Satsang",
      time: "Dopahar 3:00 – Shaam 5:00",
      description: "Bhakti sangeet, ardaas aur aashirwaad ke saath jashn ki shuruaat.",
    },
    shagun: {
      name: "Shagun",
      time: "Subah 11:00 – Dopahar 1:00",
      description: "Do parivaaron ke milan par aashirwaad aur shagun ka len-den.",
    },
    haldi: {
      name: "Haldi",
      time: "Dopahar 2:00 – 3:30",
      description: "Hansi, rasmon aur pyaar se bhara ek sunehra jashn.",
    },
    ring: {
      name: "Ring Ceremony & Cocktail",
      time: "Raat 8:00 baje se",
      description: "Ek khoobsurat vaade aur nayi shuruaat ka jashn manati ek elegant shaam.",
    },
    jaggo: {
      name: "Jaggo Night",
      time: "Shaam 7:00 baje se",
      description: "Dhol, music, bhangra aur rasmon se bhari ek dhamakedar Punjabi raat.",
    },
    mehndi: {
      name: "Saant & Mehndi",
      time: "Dopahar 12:00 baje se",
      description: "Rasmon, mehndi aur parivaar ke aashirwaad ka ek khoobsurat jashn.",
    },
    sehra: {
      name: "Sehra Bandi",
      time: "Shaam 4:00 baje",
      description: "Pyaar se sehra bandha jaata hai aur parivaar dulhe ko aashirwaad deta hai.",
    },
    baraat: {
      name: "Baraat Ki Ravaangi",
      time: "Shaam 6:00 baje",
      description: "Shaadi ke grand jashn ki shuruaat.",
      venueNote: "Saidha Family Residence se ravaangi",
    },
    anand: {
      name: "Anand Karaj",
      time: "Subah 4:00 baje",
      description: "Waheguru ji ke aashirwaad se, do roohein apna saath ka safar shuru karti hain.",
    },
  },
  venuesSection: {
    eyebrow: "Jahan hum saath jashn manayenge",
    title: "Venues",
    eventsHere: "Yahan ke function",
    directions: "Raasta dekhein",
  },
  venues: en.venues,
  contactsSection: {
    eyebrow: "Parivaar ki taraf se thodi madad",
    title: "Hum aapke liye yahan hain",
    intro:
      "Travel, stay ya jashn ke dauraan kisi bhi cheez ke liye, hamara parivaar bas ek message door hai.",
    bridesSide: "Dulhan ki taraf",
    groomsSide: "Dulhe ki taraf",
    whatsapp: "WhatsApp",
    pending: "Number jaldi share hoga",
    message: "Hello! Abhimanyu aur Aashi ki shaadi ke baare mein ek sawaal tha.",
  },
  closing: {
    eyebrow: "Pyaar ke saath, hamari taraf se",
    title: "Shaadi mein milte hain.",
    dates: "7 – 13 December 2026 · Ludhiana & Moga",
    hashtags: "Apne pal share karein",
    backToTop: "Upar jaayein",
  },
  footer: {
    language: "Bhasha",
    withLove: "Pyaar ke saath, Saidha Parivaar",
    address: en.footer.address,
  },
};

export const translations: Record<Lang, Dictionary> = { en, hi, hinglish };

/** "2026-12-07" → { day: "07", month: "December", weekday: "Monday", year: "2026" } */
export function formatDateParts(isoDate: string, dict: Dictionary) {
  const [y = 0, m = 1, d = 1] = isoDate.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return {
    day: String(d).padStart(2, "0"),
    month: dict.calendar.months[m - 1],
    weekday: dict.calendar.weekdays[weekday],
    year: String(y),
  };
}
