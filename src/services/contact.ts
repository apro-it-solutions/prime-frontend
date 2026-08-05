/**
 * Contact service — API-ready.
 *
 * Today `submitContactForm` resolves against a mock. To wire the real backend,
 * uncomment the axios call and point it at the endpoint; the payload/response
 * interfaces already match what a REST handler would expect.
 */
// import axios from "axios";

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

/** Simulated network latency for the mock submission. */
const MOCK_DELAY_MS = 1200;

/**
 * Submit the contact / quote request.
 *
 * Replace the mocked block with the axios call below when the API is live:
 *
 *   const { data } = await axios.post<ContactResponse>(
 *     `${process.env.NEXT_PUBLIC_API_URL}/contact`,
 *     payload,
 *   );
 *   return data;
 */
export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResponse> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  // Mock a validation failure the backend might raise, so the error UI is real.
  if (/@example\.(com|test)$/i.test(payload.email)) {
    throw new Error("Please use a valid business email address.");
  }

  return {
    success: true,
    message: "Thanks — we'll get back to you within one business day.",
    reference: `REQ-${Date.now().toString(36).toUpperCase()}`,
  };
}
