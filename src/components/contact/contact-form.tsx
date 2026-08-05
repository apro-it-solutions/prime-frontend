"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, ChevronDown, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/services/contact";

const PROJECT_TYPES = [
  "Warehouse",
  "Industrial",
  "Commercial",
  "Logistics",
  "Cold Room",
  "Custom Fabrication",
  "Other",
] as const;

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone number."),
  projectType: z.string().min(1, "Please select a project type."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your project (min 10 characters)."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const fieldClass =
  "h-[52px] w-full rounded-[12px] border border-border bg-bg-base px-4 font-body text-base text-text-primary placeholder:text-text-secondary/70 transition-colors focus:border-green-accent focus:outline-none focus:ring-2 focus:ring-green-accent/30 disabled:opacity-60";

const labelClass =
  "font-body text-xs font-medium uppercase tracking-[0.5px] text-text-secondary";

export function ContactForm() {
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState({ status: "idle" });
    try {
      const res = await submitContactForm(values);
      setSubmitState({ status: "success", message: res.message });
      reset();
    } catch (err) {
      setSubmitState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  function fieldError(name: keyof ContactFormValues) {
    const error = errors[name];
    if (!error) return null;
    return (
      <p
        id={`${formId}-${name}-error`}
        role="alert"
        className="mt-1.5 flex items-center gap-1 font-body text-sm text-red-600"
      >
        <AlertCircle className="size-3.5 shrink-0" />
        {error.message}
      </p>
    );
  }

  function describedBy(name: keyof ContactFormValues) {
    return errors[name] ? `${formId}-${name}-error` : undefined;
  }

  return (
    <div className="rounded-[28px] border border-border bg-bg-card p-6 shadow-[0px_12px_32px_0px_rgba(15,23,18,0.06)] sm:p-8 lg:p-12">
      <h2 className="font-body text-[28px] font-bold leading-[1.15] tracking-[-0.28px] text-text-primary">
        Request a Quote
      </h2>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[18px] flex flex-col gap-[18px]"
      >
        {/* Full name + company */}
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-fullName`} className={labelClass}>
              Full Name
            </label>
            <input
              id={`${formId}-fullName`}
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              aria-invalid={!!errors.fullName}
              aria-describedby={describedBy("fullName")}
              className={cn(fieldClass, errors.fullName && "border-red-400")}
              {...register("fullName")}
            />
            {fieldError("fullName")}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-company`} className={labelClass}>
              Company
            </label>
            <input
              id={`${formId}-company`}
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              aria-invalid={!!errors.company}
              aria-describedby={describedBy("company")}
              className={cn(fieldClass, errors.company && "border-red-400")}
              {...register("company")}
            />
            {fieldError("company")}
          </div>
        </div>

        {/* Email + phone */}
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-email`} className={labelClass}>
              Email
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
              className={cn(fieldClass, errors.email && "border-red-400")}
              {...register("email")}
            />
            {fieldError("email")}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-phone`} className={labelClass}>
              Phone
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              autoComplete="tel"
              placeholder="+91 XXXXX XXXXX"
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy("phone")}
              className={cn(fieldClass, errors.phone && "border-red-400")}
              {...register("phone")}
            />
            {fieldError("phone")}
          </div>
        </div>

        {/* Project type */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-projectType`} className={labelClass}>
            Project Type (Warehouse, Industrial, etc.)
          </label>
          <div className="relative">
            <select
              id={`${formId}-projectType`}
              defaultValue=""
              aria-invalid={!!errors.projectType}
              aria-describedby={describedBy("projectType")}
              className={cn(
                fieldClass,
                "cursor-pointer appearance-none pr-11",
                errors.projectType && "border-red-400",
              )}
              {...register("projectType")}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-text-secondary"
            />
          </div>
          {fieldError("projectType")}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-message`} className={labelClass}>
            Message / Requirements
          </label>
          <textarea
            id={`${formId}-message`}
            rows={4}
            placeholder="Tell us about your building requirements…"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            className={cn(
              fieldClass,
              "h-[110px] resize-y py-3.5 leading-[1.5]",
              errors.message && "border-red-400",
            )}
            {...register("message")}
          />
          {fieldError("message")}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-green-primary py-[18px] font-body text-base text-white transition-colors duration-200 hover:bg-green-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Request
              <ArrowUpRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </button>

        {/* Status messages */}
        <div aria-live="polite" role="status">
          {submitState.status === "success" && (
            <p className="flex items-center gap-2 rounded-[12px] bg-green-soft px-4 py-3 font-body text-sm text-green-primary">
              <CheckCircle2 className="size-4 shrink-0" />
              {submitState.message}
            </p>
          )}
          {submitState.status === "error" && (
            <p className="flex items-center gap-2 rounded-[12px] bg-red-50 px-4 py-3 font-body text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {submitState.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
