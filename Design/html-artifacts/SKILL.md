---
name: html-artifacts
description: Use this skill when the user wants an answer delivered as a polished HTML artifact, Codex inline visualization, interactive mini page, dashboard, explainer, calculator, comparison, mockup, or rich formatted output instead of plain prose. Use the Codex inline visualization contract when available; otherwise create a self-contained HTML file. Avoid emoji-heavy decoration and prefer clear icons, accessible layout, and interactive controls.
---

# HTML Artifacts

Use this skill to turn an answer into a useful, polished HTML artifact when visual structure or interaction would make the response better.

This skill cannot force every Codex client to render HTML inline. When the Codex inline visualization surface is available, use its exact file-and-directive contract. If inline rendering is unavailable, create or provide a self-contained `.html` artifact and explain how it was delivered.

## When To Use

Use for:

- Visual explanations, decision aids, calculators, timelines, scorecards, comparison tables, dashboards, demos, mockups, and interactive summaries.
- Responses where layout, scanning, filtering, tabs, toggles, sliders, or charts would be more useful than paragraphs.
- User requests mentioning artifact, render, inline rendering, interactive response, HTML output, rich answer, visual answer, or browser-style answer.

Do not use for simple answers where normal Markdown is clearer.

## Output Decision

Choose the best delivery mode available:

1. If the current surface supports Codex inline visualization, create an inline visualization fragment and render it with `::codex-inline-vis{file="<title>.html"}`.
2. If the user asked for a standalone page, website, app page, component, or project file, create a self-contained `.html` file in the workspace instead of using inline visualization.
3. If inline visualization is unavailable but a file artifact is useful, create a self-contained `.html` file in the workspace.
4. If neither inline visualization nor file creation is available, provide a compact fenced `html` block and explain that rendering depends on the client.

Do not claim the artifact rendered inline unless it actually did.

## Codex Inline Visualization Contract

When using Codex inline visualization:

- Write a new concise ASCII lowercase-hyphenated `<title>.html` file in the thread-scoped visualization directory listed in writable roots, such as `.codex/visualizations/YYYY/MM/DD/<thread-id>`.
- Write only an HTML fragment: no `<!doctype>`, `<html>`, `<head>`, or `<body>`.
- Write literal markup, CSS, and JavaScript directly in the file. Do not write escaped HTML such as `<div class=\"card\">` or literal `\n` sequences.
- Give the fragment root a unique ID and select it with `document.getElementById(...)`.
- Keep CSS and JavaScript local to the fragment unless base classes are sufficient.
- Do not use `fetch`, XHR, WebSocket, or other API calls.
- Use only allowed CDN origins when external resources are necessary: `cdnjs.cloudflare.com`, `esm.sh`, `cdn.jsdelivr.net`, `unpkg.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, and `fonts.bunny.net`.
- Keep the fragment focused on the visualization. Put any necessary explanation outside the fragment.
- In the final response, place this directive exactly where the inline visual should appear:

```text
::codex-inline-vis{file="<title>.html"}
```

- Emit only the directive for the fragment itself. Do not add a Markdown link to the visualization file or call it an attachment/download.

For actions that should ask Codex to investigate or explain selected data, use:

```js
await window.openai.sendFollowUpMessage({
  title: "Concise action title",
  prompt: "Specific follow-up prompt with the selected values."
});
```

Do not use `window.openai` interactions in standalone exports unless they are replaced with normal browser behavior.

## Artifact Requirements

- Use one self-contained HTML document for standalone artifacts unless the user asks for integration into an existing app.
- Include CSS and JavaScript inline when creating a standalone artifact.
- Use an HTML fragment, not a complete document, for Codex inline visualization.
- Make the first screen useful; avoid landing-page filler unless the user asked for a landing page.
- Prefer clean structure: header, primary content area, controls, result/details area, and concise footer or notes only when useful.
- Keep emoji use minimal. Prefer accessible text labels and simple icons from inline SVG, CSS, Unicode symbols, or existing icon libraries if the app already uses them.
- Build meaningful interaction: filters, tabs, sorting, sliders, toggles, editable inputs, expandable sections, or computed results when they fit the task.
- Preserve accessibility: semantic HTML, visible focus states, adequate contrast, labels for controls, keyboard-operable interactions, and responsive layout.
- Keep styles professional and restrained; avoid decorative clutter, excessive gradients, and overanimated effects.
- Ensure text fits within controls and cards on mobile and desktop.
- Do not load remote scripts, fonts, images, or trackers unless the user explicitly approves or the environment already requires them.

## Response Pattern

When using this skill:

1. Choose inline visualization or standalone HTML based on the request and available surface.
2. Create the artifact using the correct contract for that mode.
3. For inline visualization, keep prose concise and include the `::codex-inline-vis{file="<title>.html"}` directive.
4. For standalone HTML, mention the file path and how to open it.
5. Note any rendering limitation if the platform cannot display HTML inline.

## Quality Checks

- For standalone files, check the HTML has a single complete document structure: `<!doctype html>`, `html`, `head`, and `body`.
- For inline visualizations, check the HTML is a fragment with no document wrapper and includes the required directive in the final response.
- Check interactive controls have event handlers and visible state changes.
- Check layout at narrow and desktop widths when a browser or screenshot tool is available.
- Check the artifact does not depend on unavailable network assets.
- If a visual check is not possible, say so plainly.

## Judgment

This works as a behavior-shaping skill for artifact creation. It does not work as a guarantee of inline rendering in every UI; rendering is controlled by the host product and available tools.
