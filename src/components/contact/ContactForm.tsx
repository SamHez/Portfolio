"use client";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { profile } from "@/content/profile";
type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
const fields = [
  { name: "name", label: "Full Name", autoComplete: "name", max: 100 },
  { name: "email", label: "Email Address", autoComplete: "email", max: 254 },
  { name: "subject", label: "Subject", autoComplete: "off", max: 160 },
  { name: "message", label: "Message", autoComplete: "off", max: 5000 },
] as const;
const config = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const subscribe = () => () => {};
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "error" | "unavailable"
  >("idle");
  const inFlight = useRef(false);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const configured = Boolean(config.service && config.template && config.key);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      fields.map((field) => [
        field.name,
        String(data.get(field.name) || "").trim(),
      ]),
    ) as Record<Field, string>;
    const next: Errors = {};
    if (values.name.length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (values.subject.length < 3)
      next.subject = "Please add a subject of at least 3 characters.";
    if (values.message.length < 20)
      next.message = "Please include at least 20 characters in your message.";
    for (const field of fields)
      if (values[field.name].length > field.max)
        next[field.name] = `Please use no more than ${field.max} characters.`;
    setErrors(next);
    setState("idle");
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (data.get("website")) {
      setState("error");
      return;
    }
    if (!configured) {
      setState("unavailable");
      return;
    }
    inFlight.current = true;
    setState("sending");
    try {
      await emailjs.send(
        config.service!,
        config.template!,
        {
          from_name: values.name,
          name: values.name,
          email: values.email,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
        },
        {
          publicKey: config.key!,
          limitRate: { id: "portfolio-contact", throttle: 30000 },
        },
      );
      form.reset();
      setState("success");
    } catch {
      setState("error");
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-label="Contact Samuel"
      aria-busy={state === "sending"}
    >
      <noscript>
        <p>
          Please enable JavaScript to use the form, or email {profile.email}{" "}
          directly.
        </p>
      </noscript>
      {!configured && (
        <p className="form-notice">
          The online form is currently unavailable. You can reach me directly at{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      )}
      <div className="form-fields">
        {fields.map((field) => (
          <div key={field.name} className={`form-field field-${field.name}`}>
            <label htmlFor={`contact-${field.name}`}>
              {field.label} <span aria-hidden="true">*</span>
            </label>
            {field.name === "message" ? (
              <textarea
                id={`contact-${field.name}`}
                name={field.name}
                rows={6}
                maxLength={field.max}
                required
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
              />
            ) : (
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.name === "email" ? "email" : "text"}
                autoComplete={field.autoComplete}
                maxLength={field.max}
                required
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
              />
            )}{" "}
            {errors[field.name] && (
              <p className="field-error" id={`${field.name}-error`}>
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          name="website"
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-send-row">
        <p>All fields are required.</p>
        <button
          type="submit"
          className="button button-primary"
          disabled={!mounted || state === "sending"}
        >
          {state === "sending" ? (
            <>
              Sending{" "}
              <LoaderCircle
                size={16}
                className="sending-icon"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              Send Message <ArrowUpRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <div
        className="form-feedback"
        role={state === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {state === "success" && (
          <p>
            Thank you. Your message has been sent. I&apos;ll get back to you
            soon.
          </p>
        )}
        {state === "error" && (
          <p>
            Your message couldn&apos;t be sent. Please try again later or email{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        )}
        {state === "unavailable" && (
          <p>
            The form isn&apos;t available yet. Please email{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a> to start the
            conversation.
          </p>
        )}
      </div>
    </form>
  );
}
