// Netlify Forms submission helper.
//
// Netlify detects forms by parsing the deployed HTML at build time, so every form
// posted through here must have a matching hidden <form> in public/index.html with
// the same name and the same field names. Submissions are POSTed as urlencoded data
// to any path on the site and picked up by Netlify's form handler.
//
// Note: this does not work against the craco dev server (it only answers GET).
// Use `netlify dev` or a deploy preview to test submissions.

const encode = (data) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
    .join("&");

export async function submitNetlifyForm(formName, data) {
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, "bot-field": "", ...data }),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}
