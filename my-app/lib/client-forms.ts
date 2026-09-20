export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea" | "radio";
  required?: boolean;
  maxLength?: number;
  options?: string[];
  autoComplete?: string;
};

// Edit each template here. These questions also drive server validation.
const name: FormField = { name: "name", label: "Ditt namn", type: "text", required: true, maxLength: 120, autoComplete: "name" };
const email: FormField = { name: "email", label: "Din mest besökta e-post", type: "email", required: true, maxLength: 254, autoComplete: "email" };
const roles = ["General", "Kassör", "Båda"];

export const clientForms = {
  application: {
    title: "Sök General eller Kassör",
    description: "Nääämen heeej!\n\nDet har äntligen blivit dags att tillsätta General och Kassör!\nVid frågor nå ut till antingen general@legionen.nu eller kassor@legionen.nu\n\nHåll utkik på instagram!\nRöda hälsningar, Cheif Wade P. Sam och Neah B. Louza",
    sectionTitle: "Sök Legionen",
    sectionDescription: "Här söker du General eller Kassör i Legionen!",
    submitLabel: "Skicka ansökan",
    success: "Tack! Vi har tagit emot din ansökan.",
    fields: [
      { ...name, label: "Namn?" },
      { name: "liuId", label: "Ditt LIU-ID?", type: "text", required: true, maxLength: 120 },
      { ...email, label: "Din mest besöka mail" },
      { name: "className", label: "Klass?", type: "text", required: true, maxLength: 120 },
      { name: "role", label: "Vad söker du för något?", type: "radio", required: true, options: roles },
      { name: "message", label: "Varför söker du Legionen?", type: "textarea", required: true, maxLength: 4000 },
    ] as FormField[],
  },
  nomination: {
    title: "Nominera General eller Kassör",
    description: "Känner du någon som skulle passa som General eller Kassör? Nominera personen här.",
    submitLabel: "Skicka nominering",
    success: "Tack! Vi har tagit emot din nominering.",
    fields: [
      { name: "nominee", label: "Vad heter personen du vill nominera?", type: "text", required: true, maxLength: 120 },
      { name: "liuId", label: "Personens liu-id?", type: "text", required: true, maxLength: 120 },
      { name: "className", label: "Klass?", type: "text", required: true, maxLength: 120 },
      { name: "message", label: "Varför bör personen vara med i Legionen?", type: "textarea", required: true, maxLength: 4000 },
      { name: "role", label: "Vilken post hade passat personen du vill nominera?", type: "radio", required: true, options: roles },
    ] as FormField[],
  },
};

export type FormType = keyof typeof clientForms;

// Preserve the original first five columns. Add matching sheet headers for new fields.
export const responseColumns = ["name", "email", "programme", "message", "formType", "role", "nominee", "nomineeEmail", "experience", "liuId", "className"];

export function validateSubmission(body: Record<string, unknown>) {
  const formType = body.formType;
  if (formType !== "application" && formType !== "nomination") return null;
  if (body.website) return null;
  const values: Record<string, string> = { formType };
  for (const field of clientForms[formType].fields) {
    const raw = body[field.name];
    if (raw !== undefined && typeof raw !== "string") return null;
    const value = typeof raw === "string" ? raw.trim() : "";
    if (field.required && !value) return null;
    if (field.maxLength && value.length > field.maxLength) return null;
    if (value && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
    if (value && field.options && !field.options.includes(value)) return null;
    values[field.name] = value;
  }
  return values;
}
