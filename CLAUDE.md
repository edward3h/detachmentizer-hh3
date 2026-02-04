# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Detachmentizer HH3 is an unofficial web application to help players of Warhammer: The Horus Heresy 3rd Edition select and organise units into valid detachments for army building.

**Current Status**: Specification/design phase - documentation exists but no implementation code yet.

## Technology Stack (Planned)

- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Version Manager**: asdf (see `.tool-versions`)
- **Formatting**: Prettier
- **Linting**: ESLint
- **Runtime**: Browser only (no backend)
- **Storage**: Browser local storage for user selections
- **Theming**: Light/dark modes based on system setting

## Build Commands (Once Implemented)

```bash
pnpm dev      # Development server with hot reload
pnpm build    # Production build to static assets
pnpm lint     # Run ESLint
pnpm format   # Run Prettier
```

## Architecture

Single-page application with:

- In-memory state persisted to local storage
- Dynamic DOM updates on state changes
- Core algorithm to allocate units into valid detachments per game rules

## Key Documentation Files

- `application.md` - Functional specification (UI flows, state management, display rules)
- `army-selection.md` - Game rules (allegiances, factions, battlefield roles, detachment types)
- `legiones-astartes-detachments.md` - Legiones Astartes faction detachment rules
- `imperialis-militia-detachments.md` - Imperialis Militia faction detachment rules
- `implementation-notes.md` - Technical decisions

## Domain Concepts

- **Allegiance**: Loyalist or Traitor
- **Faction**: Army type (e.g., Legiones Astartes, Imperialis Militia)
- **Sub-faction**: Specific legion or variant within a faction
- **Detachment**: A structure containing slots that units fill
- **Battlefield Role**: Unit category (HQ, Troops, Elites, etc.)
- **Prime**: A rule allowing flexible slot usage (prefer not to use when allocating)
