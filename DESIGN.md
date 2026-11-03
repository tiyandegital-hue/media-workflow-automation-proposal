# DESIGN.md — Media Workflow Automation Proposal (Tiyan Digital)

## Overview
Proposal site for a media company hiring for workflow automation (Reddit lead, Oct 2026). Goal: one action — book a free workflow audit. Visitor is an ops/content lead drowning in manual tool-juggling. The site must feel like it was built by people who actually wire systems together: precise, technical, calm.

## Mood (3 words)
Precise. Connected. Calm.

## Signature idea (one per site)
A living automation pipeline as the hero: an animated SVG node graph (Sheets → AI → Trello → Publish → Report) with data packets visibly traveling along connectors. The medium is the message — the site itself demonstrates automation.

## Colors
- --bg: #101210 (near-black, green-tinted)
- --surface: #161814
- --ink: #F2F0E8 (warm paper)
- --muted: #9AA096
- --line: rgba(242,240,232,.12)
- --accent: #D7F74B (signal lime) — the ONLY chromatic color; used on primary CTA + active nodes + key highlights
- --accent-ink: #101210
- 60-30-10: bg 60 / surface+ink 30 / accent 10 (accent <5% of any screen)

## Typography
- Display: "Space Grotesk", 600, clamp(44px,7vw,96px), lh 0.95, tracking -0.03em
- Body: "Inter", 16-18px, lh 1.65
- Mono labels: "IBM Plex Mono", 11-12px, uppercase, +0.18em tracking, 55% opacity
- Max 2 families + 1 mono. H1 is 5-6x body. Hand-break headlines.

## Layout
- 12-col grid, max 1170px, margins 24px desktop / 18px mobile
- Section gaps: 120px desktop / 72px mobile
- Asymmetric hero: left column copy, right column pipeline diagram
- Radius: 8px (technical). Depth = hairlines, no shadows.
- One idea per first screen; endings are designed CTA scenes, not link dumps.

## Motion
- Entrance: nav → eyebrow → H1 → sub → CTA, 0.12s stagger, expo.out cubic-bezier(0.16,1,0.3,1), 0.8s, translateY 24px + opacity
- Pipeline packets: linear travel along SVG paths, 2.4s loop, staggered
- Hovers: scale ≤1.03, 200ms; :active 0.97
- prefers-reduced-motion: all animation off, final states visible
- If JS fails: content visible (no opacity-0 defaults in CSS)

## Copy rules
- Outcome language, never jargon-first ("every asset tracked" not "workflow orchestration")
- Banned: delve, leverage, unlock, seamless, cutting-edge, game-changer, robust, end-to-end
- No invented stats, testimonials, or prices. Real catalog prices only.

## Known gaps
- No real client logos or case studies exist for this vertical — proof section uses concrete workflow blueprints instead of logos.
- Reddit thread URL not retrievable (Reddit blocked by fetch policy) — parent to pull via browser.
- Screenshots at 1440/768/390 could not be taken (no browser in this environment) — static QA + code review done; parent should verify visually before outreach.
