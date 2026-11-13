/**
 * Family helpline. Add WhatsApp numbers with country code (e.g. "+91 98xxxxxxxx").
 * Leave `whatsapp` empty until the family shares a number — the button then shows
 * "Number to be shared soon" instead of a broken link.
 */
export type PersonKey = "deepak" | "vaishali" | "sanjeev" | "sanya";
export type RelationKey = "fatherOfGroom" | "motherOfGroom" | "fatherOfBride" | "motherOfBride";

export interface FamilyContact {
  id: string;
  person: PersonKey;
  relation: RelationKey;
  whatsapp: string;
}

export const contacts: { bride: FamilyContact[]; groom: FamilyContact[] } = {
  bride: [
    {
      id: "bride-father",
      person: "sanjeev",
      relation: "fatherOfBride",
      whatsapp: "+91 94170 30792",
    },
    { id: "bride-mother", person: "sanya", relation: "motherOfBride", whatsapp: "+91 76963 55117" },
  ],
  groom: [
    {
      id: "groom-father",
      person: "deepak",
      relation: "fatherOfGroom",
      whatsapp: "+91 98766 21266",
    },
    {
      id: "groom-mother",
      person: "vaishali",
      relation: "motherOfGroom",
      whatsapp: "+91 96969 66133",
    },
  ],
};

/** Returns a wa.me link, or null when no usable number is configured. */
export function whatsappLink(number: string, message = "") {
  let digits = number.replace(/\D/g, "");
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  if (digits.length < 10) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
