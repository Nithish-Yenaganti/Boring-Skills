---
name: onepage-resume
description: Create or revise a LaTeX resume so it fits exactly one full page, with dense professional layout, no large unused whitespace, and no overflow beyond one page.
metadata:
  short-description: Make a tightly fit one-page LaTeX resume
---

# One-Page LaTeX Resume

Use this skill when the user wants a resume generated, converted, or edited as LaTeX and the result must fit on exactly one page.

## Core Requirements

- The resume must compile to exactly one PDF page.
- The page should look intentionally full: no half-page resume, no large blank bands, and no wasted space from loose section gaps.
- Do not let content spill to a second page, hide below the page, or require manual cropping.
- Preserve resume quality while fitting: prioritize impact, clarity, and truthful concise wording over shrinking text to unreadable sizes.
- Default to a professional ATS-friendly layout unless the user requests a visual or creative resume.

## Workflow

1. Gather the target role, candidate details, experience, education, skills, projects, and links from the user-provided material.
2. Create or edit a `.tex` file using compact resume structure: header, summary if useful, experience, projects, skills, education, and optional awards or certifications.
3. Compile the LaTeX source to PDF.
4. Verify the PDF has exactly one page with `pdfinfo`, `qpdf`, `mutool`, or another available PDF inspection tool.
5. Inspect the rendered page visually or by converting to an image when possible. Check for overflow, clipped text, excessive whitespace, tiny text, awkward wrapping, and weak section balance.
6. Iterate layout and wording until the resume is exactly one polished, full page.

## Factuality Rules

- Never hallucinate, invent, or assume experience, project, employer, client, product, metric, tool, technology, certification, award, education, date, title, or responsibility details.
- For `Experience` and `Projects`, only rewrite, tighten, reorganize, and enhance the user's provided facts.
- Enhancements must be directly grounded in the source material. It is acceptable to make wording stronger, more specific, and more resume-like, but not to add new facts or unsupported outcomes.
- Do not create new projects, responsibilities, business impact, technical architecture, team size, scale, revenue, performance metrics, or leadership claims unless they are explicitly present in the source.
- If a bullet needs stronger evidence, ask the user for the missing detail or leave it generalized without fabricating.
- If source details are ambiguous, preserve the ambiguity or mark the point as needing clarification instead of guessing.

## Layout Defaults

- Use letter paper unless the user specifies another page size.
- Use tight margins, usually `0.45in` to `0.65in`; do not go below `0.35in` unless necessary and still readable.
- Keep body text generally between `9pt` and `11pt`; avoid unreadable microtype as a substitute for editing.
- Use compact section spacing, aligned dates, concise bullets, and consistent typography.
- Prefer one-column ATS-friendly layouts for most resumes. Use two columns only when the user requests it or the source material strongly benefits from it.
- Avoid decorative elements that consume space without improving scannability.

## Fitting Strategy

If the resume is too short:
- Add high-signal content from the source material before enlarging spacing.
- Expand bullets only with measurable outcomes, scope, tools, customers, scale, or business impact already present in the source material.
- Add relevant projects, technical skills, certifications, coursework, publications, or awards only when supported by the source.
- Increase vertical spacing modestly only after content quality is strong.

If the resume is too long:
- Cut weak bullets, old or irrelevant details, repeated tools, and generic responsibilities.
- Merge related bullets, remove filler words, tighten date and location formatting, and shorten section labels.
- Reduce spacing and margins within readable limits.
- Keep the strongest, most role-relevant evidence.

## LaTeX Guidance

- Use stable, common packages such as `geometry`, `enumitem`, `titlesec`, `tabularx`, `hyperref`, `fontawesome5` only when available, and font packages already supported by the environment.
- Configure compact lists with `enumitem`, for example `leftmargin=*`, `itemsep=1pt`, `topsep=1pt`, and `parsep=0pt`.
- Use `\raggedright` or careful `tabularx` alignment to reduce overfull boxes.
- Make hyperlinks clean and readable; include URL text only when useful.
- Avoid fragile custom macros unless they clearly reduce repetition and improve maintainability.

## Validation

Always report the validation performed. A complete pass includes:

- LaTeX compile command used and whether it succeeded.
- PDF page count, which must be `1`.
- Any visual/render inspection performed.
- Remaining limitations if a tool such as LaTeX, `pdfinfo`, or image rendering is unavailable.

Do not claim the resume fits one full page unless it has been compiled and the resulting PDF page count has been checked.
