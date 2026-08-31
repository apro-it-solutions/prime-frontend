import axios from "axios";
import { clientEnv } from "@/lib/env";

/**
 * Contact service.
 *
 * Posts the quote request to `POST {NEXT_PUBLIC_API_URL}/contact` on the Prime
 * NMS backend, which stores the enquiry for the admin dashboard and emails a
 * notification to the sales inbox. The two are independent there: a submission
 * is saved even if the mail fails, so a `success` here means "we have it", not
 * "the email landed".
 */

export interface ContactPayload {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  /** Reference id returned by the backend once persisted. */
  reference?: string;
}

/** The envelope every endpoint on this backend replies with. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T | null;
}

const client = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * The backend contact model is a generic name/email/phone/subject/message, so
 * the two fields it has no column for — project type and company — are folded
 * into the subject line, where they are what the inbox and the dashboard list
 * actually show at a glance.
 */
function toSubject({ projectType, company }: ContactPayload): string {
  const subject = company ? `${projectType} — ${company}` : projectType;
  // The column is capped at 200 characters; a long company name is trimmed
  // rather than rejected by validation the visitor cannot see.
  return subject.slice(0, 200);
}

/** Submit the contact / quote request. */
export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResponse> {
  try {
    const { data } = await client.post<ApiEnvelope<{ _id?: string }>>(
      "/contact",
      {
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        subject: toSubject(payload),
        message: payload.message,
      },
    );

    return {
      success: data.success,
      message:
        data.message || "Thanks — we'll get back to you within one business day.",
      reference: data.data?._id,
    };
  } catch (error) {
    // Surface the backend's own wording (a validation message, say) when there
    // is one, and a plain network message when the request never arrived.
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as ApiEnvelope<unknown> | undefined)
        ?.message;
      throw new Error(
        message ||
          "We couldn't send your request just now. Please try again, or email info@primenms.com.",
      );
    }
    throw error;
  }
}
