// Shared validation for the quote and bulk-quote forms.
//
// Both forms collect the same three required contact fields (name, email, phone),
// so the rules live here rather than being duplicated per form.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const isValidEmail = (value) => EMAIL_RE.test(String(value ?? "").trim());

// Canadian / US numbers: 10 digits, or 11 with a leading 1 country code.
// Callers may type spaces, dashes, dots, parentheses or a leading + freely.
export const isValidPhone = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
};

const RULES = {
  name: (v) => (!String(v ?? "").trim() ? "Please enter your name." : ""),
  email: (v) => {
    if (!String(v ?? "").trim()) return "Please enter your email address.";
    return isValidEmail(v) ? "" : "Enter a valid email address, like you@email.com.";
  },
  phone: (v) => {
    if (!String(v ?? "").trim()) return "Please enter your phone number.";
    return isValidPhone(v) ? "" : "Enter a 10-digit phone number, like (647) 375-3572.";
  },
};

export const validateField = (field, value) => (RULES[field] ? RULES[field](value) : "");

// Returns { field: message } for every contact field that fails, {} when all pass.
export const validateContact = (form) =>
  Object.keys(RULES).reduce((acc, field) => {
    const message = validateField(field, form[field]);
    if (message) acc[field] = message;
    return acc;
  }, {});

export const ERROR_MSG_CLS = "mt-1.5 text-[11px] font-semibold text-red-300";

// The `!` prefix wins over the cyan border/ring already in FIELD_CLS without
// pulling tailwind-merge (~9 kB gzipped) into the bundle just for this.
export const fieldCls = (base, hasError) =>
  hasError ? `${base} !border-red-400/60 focus:!ring-red-400/25` : base;
