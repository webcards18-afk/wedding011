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
    { id: "bride-father", person: "sanjeev", relation: "fatherOfBride", whatsapp: "" },
    { id: "bride-mother", person: "sanya", relation: "motherOfBride", whatsapp: "" },
  ],
  groom: [
    { id: "groom-father", person: "deepak", relation: "fatherOfGroom", whatsapp: "" },
    { id: "groom-mother", person: "vaishali", relation: "motherOfGroom", whatsapp: "" },
  ],
};

/** Returns a wa.me link, or null when no usable number is configured. */
export function whatsappLink(number: string, message = "") {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
