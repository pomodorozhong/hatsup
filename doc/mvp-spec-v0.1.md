# Hats Up — MVP Spec v0.1

An iOS app for structured problem-solving with the Six Thinking Hats method.

MVP is a **session runner**: pick a template, wear one hat at a time, see how to think in that hat, and keep time. Afterward, review what you ran and how long each hat lasted.

The same session works for **solo thinking** and **facilitator-led groups**. In a group, everyone wears the same hat at the same time; the phone is the shared cue. Switch to **group display** when the phone sits on the table so the current hat is readable from across it. There is no multi-device sync in MVP.

## Users

| User | Job |
| --- | --- |
| Solo thinker | Work a personal problem through a hat sequence without drifting. |
| Facilitator | Run a meeting: make the current hat obvious, time each round, and keep the agenda. |

Both use the same features. Difference is how the phone is held (private vs. visible to the table via group display), not a separate mode.

## In scope

- Start sessions from **session templates** (named hat sequence + per-hat duration).
- Run a session: activate hats in order, show **built-in prompts**, show a **timer**, switch between **solo** and **group** display.
- Afterward: **session history** and a **digest** (hat sequence + time spent per hat).

## Out of scope (later)

- Settings: About, Tip jar.
- Custom session templates.
- Notes during or after a session.
- AI-generated summaries.
- AI-generated prompts.
- Custom prompts per hat.
- Accounts, cloud sync, or sharing a digest.

## User stories

- As a first-time user, I want to see a onboarding screen so I know how to get started.
- As a basic user, I want built-in starter templates so I can run a session before I have designed my own.
- As a basic user, I want to see hat prompts when a hat is active so I (or the group) know how to think in that hat.
- As a basic user, I want a timer in a session so I can keep each hat to the planned time.
- As a basic user, I want to view session history so I can find a past run.
- As a basic user, I want to give a session a topic so history and digests are recognizable later.
- As a basic user, I want a session digest so I can see which hats ran and how long each lasted.
- As a facilitator, I want to switch to group display so others can see the current hat from across a table.

**Later (not MVP)**

- As an advanced user, I want to create a session template so I can start the next session without rebuilding the agenda.
- As an advanced user, I want to take notes in a session so I can remember what came up.
- As an advanced user, I want those notes available under other hats so I can follow up from a different angle.

## Features

### Premade session templates

Built-in starter templates (classic sequences, including Blue at start and end)

### Session

One run of a template.

- Walk the template in order: next, back; current hat can run past its duration
- Topic shown if one was entered
- Built-in prompt for the active hat (short, instructional; same copy in both displays)
- Switch between **solo** and **group** display at any time during a session
  - **Solo:** prompts, timer, and controls for the person running the session
  - **Group:** hat color + name dominate the screen, with a large timer, so people across a table can read the current hat

### Timer

While a hat is active, its timer counts down from that hat’s planned duration. Pause and resume as needed.

At zero, the phone nudges (haptic, optional sound) but does **not** advance the hat. Time then counts up as overtime; the digest records time actually spent, not the plan.

The session also shows how many hats are left and how much planned time remains.

### Hat prompts

When a hat becomes active, show a short built-in prompt for that hat (what to do, what to avoid). Copy is fixed in MVP; not user-editable.

### Session history

A list of past sessions: date, topic (or “Untitled”), template name, total duration. Opens the digest.

### Session digest

A read-only recap of one session:

- Topic, date, template name
- Hats in the order they were worn
- Time actually spent on each hat (including overtime)

No notes, no AI summary, no user-written recap in MVP.

### Settings (later)

- About
- Tip jar

## Sitemap
```mermaid
treeView-beta
Home/
    Settings/
        About us
        Tip jar
    Session templates
    Session/
    Session history/
        Session digest
```

## Open questions

- Sound on/off and default volume for “time’s up”
- Whether skipped hats appear in the digest or only hats that were actually worn
- Whether a session can be abandoned without writing history
