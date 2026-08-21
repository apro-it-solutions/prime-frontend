/**
 * Attribute a section sets on its root element to say it reveals its own
 * contents, so `PageFadeUp` hands it through untouched instead of moving it as
 * one block. See that component for what the mark means and when to use it.
 *
 * It lives here rather than beside the component because the sections that set
 * it render on the server: every export of a `"use client"` module reaches a
 * server component as a client reference, so a constant imported from there
 * would arrive as an opaque object and spread into a broken attribute name.
 */
export const SELF_REVEAL_ATTR = "data-self-reveal";
