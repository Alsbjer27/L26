"use client";

import { useRef, useState, type FormEvent } from "react";
import { clientForms, type FormType } from "@/lib/client-forms";

const fieldClass = "mt-2 w-full rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200/40";

function SubmissionForm({ type, onPending }: { type: FormType; onPending: (pending: boolean) => void }) {
  const definition = clientForms[type];
  const pending = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    pending.current = true;
    onPending(true);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), formType: type }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Det gick inte att skicka. Försök igen senare.");
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kontrollera din anslutning och försök igen.");
      setStatus("error");
    } finally {
      pending.current = false;
      onPending(false);
    }
  }

  return (
    <>
      <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-white/75">{definition.description}</p>
      {"sectionTitle" in definition && (
        <div className="mt-6 border-t border-white/20 pt-6">
          <h2 className="text-xl font-semibold text-orange-200">{definition.sectionTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-white/75">{definition.sectionDescription}</p>
        </div>
      )}
      <p className="mt-2 text-xs text-white/60">Fält markerade med * är obligatoriska.</p>
      <form onSubmit={submit} onChange={() => { if (status !== "sending") setStatus("idle"); }} className="mt-6 space-y-5" aria-label={definition.title} aria-busy={status === "sending"}>
        <fieldset disabled={status === "sending"} className="space-y-5 disabled:opacity-60">
          {definition.fields.map(field => {
            const id = `${type}-${field.name}`;
            if (field.type === "radio") {
              return (
                <fieldset key={field.name} className="space-y-2">
                  <legend className="mb-2 text-sm font-medium">{field.label}{field.required ? " *" : ""}</legend>
                  {field.options?.map((option, index) => (
                    <label key={option} htmlFor={`${id}-${index}`} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-sm hover:bg-white/10">
                      <input id={`${id}-${index}`} name={field.name} type="radio" value={option} required={field.required} className="h-4 w-4 accent-orange-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-200" />
                      {option}
                    </label>
                  ))}
                </fieldset>
              );
            }
            return (
              <div key={field.name}>
                <label htmlFor={id} className="text-sm font-medium">{field.label}{field.required ? " *" : ""}</label>
                {field.type === "select" ? (
                  <select id={id} name={field.name} required={field.required} defaultValue="" className={fieldClass}>
                    <option value="" className="bg-neutral-900">Välj ett alternativ</option>
                    {field.options?.map(option => <option key={option} value={option} className="bg-neutral-900">{option}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea id={id} name={field.name} required={field.required} maxLength={field.maxLength} rows={4} className={`${fieldClass} resize-y`} />
                ) : (
                  <input id={id} name={field.name} type={field.type} autoComplete={field.autoComplete || "off"} required={field.required} maxLength={field.maxLength} className={fieldClass} />
                )}
              </div>
            );
          })}
          <div hidden aria-hidden="true">
            <label htmlFor={`${type}-website`}>Webbplats</label>
            <input id={`${type}-website`} name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="text-xs leading-5 text-white/60">Uppgifterna skickas till Legionen så att vi kan ta hand om din {type === "application" ? "ansökan" : "nominering"}.</p>
          <button type="submit" className="min-h-12 w-full rounded-full bg-orange-200 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait">
            {status === "sending" ? "Skickar…" : definition.submitLabel}
          </button>
        </fieldset>
        <div aria-live="polite" aria-atomic="true">
          {status === "success" && <p className="rounded-xl border border-green-300/30 bg-green-950/50 p-4 text-sm text-green-100">{definition.success}</p>}
          {status === "error" && <p role="alert" className="rounded-xl border border-red-300/30 bg-red-950/50 p-4 text-sm text-red-100">{error}</p>}
        </div>
      </form>
    </>
  );
}

export default function ClientForm() {
  const [activeForm, setActiveForm] = useState<FormType>("application");
  const [pending, setPending] = useState(false);

  return (
    <div lang="sv" className="rounded-3xl border border-white/20 bg-black/45 p-6 text-white shadow-xl backdrop-blur-md sm:p-8">
      <div role="group" aria-label="Välj formulär" className="mb-7 grid grid-cols-1 gap-2 rounded-2xl bg-black/30 p-2 sm:grid-cols-2">
        {(Object.keys(clientForms) as FormType[]).map(type => (
          <button key={type} type="button" aria-pressed={activeForm === type} aria-controls={`${type}-panel`} disabled={pending} onClick={() => setActiveForm(type)} className={`min-h-12 rounded-xl px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 disabled:cursor-wait ${activeForm === type ? "bg-orange-200 text-neutral-950" : "text-white/80 hover:bg-white/10"}`}>
            {clientForms[type].title}
          </button>
        ))}
      </div>
      {(Object.keys(clientForms) as FormType[]).map(type => (
        <section key={type} id={`${type}-panel`} hidden={activeForm !== type} aria-label={clientForms[type].title}>
          <SubmissionForm type={type} onPending={setPending} />
        </section>
      ))}
    </div>
  );
}
