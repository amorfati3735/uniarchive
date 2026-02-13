# UniArchives Codebase Analysis

## Overview
UniArchives is a Vite + React (TSX) frontend that implements a single-page dashboard for discovering and viewing university study resources. The app is entirely client-side with mocked data and simulated AI/search/authorization flows. Styling is handled with Tailwind via CDN and custom CSS variables in `index.html`. There is no backend integration; resource data, analytics, and AI responses are mocked.

## Architecture And Structure
- Entry points: `index.html` (Tailwind, fonts, CSS variables) and `index.tsx` (React root).
- Root component: `App.tsx` renders `Dashboard`.
- Core feature modules live in `components/` and are mostly self-contained view components.
- Global data is defined in `constants.ts` and shared types in `types.ts`.
- Service layer is mocked in `services/aiService.ts`; `services/geminiService.ts` is unused.

## Key Feature Flows
1. **Navigation and Views**
   - `Dashboard.tsx` controls view state via `ViewMode` and URL history state.
   - `handleNavigation` pushes a custom history state object; `popstate` updates view.
   - Modes: Discover, Analytics, Subject Detail, Resource Viewer, Library.

2. **Resource Discovery**
   - Resources sourced from `MOCK_RESOURCES` and filtered locally by type, slot, and search query.
   - Discover grid uses `ResourceCard` with metadata, metrics, and quick actions.

3. **Resource Viewer**
   - `ResourceViewer.tsx` embeds PDFs via Google Docs Viewer using `resource.pdfUrl`.
   - Supports upvotes, downloads, sharing, reports, and fullscreen toggle.

4. **Search Overlay**
   - `SearchOverlay.tsx` uses mock search results and optional AI mode.
   - AI mode uses `queryQuickAI` and renders an answer only (no citations).

5. **Uploads**
   - `UploadOverlay.tsx` simulates multi-step resource uploads and injects the new resource into state.

6. **Library**
   - `Library.tsx` shows pinned subjects and saved resources, all stored in local state.

## Data Model
- `Resource` includes metadata, analytics, and optional comments.
- `CourseStats` supports analytics and heatmap data.
- `User` is a light model for login overlay simulation.

## Styling System
- Tailwind is loaded via CDN with a custom config defined in `index.html`.
- CSS variables provide dark/light theme colors toggled by `data-theme` attribute.
- Utility-first classes dominate; global styles are minimal.

## Strengths
- Clear separation of view components.
- Consistent use of `types.ts` for shared modeling.
- Fully functional UI flows with mocked data to support design iteration.
- Theme toggle and visual identity are consistent throughout components.

## Issues And Risks
1. **History state is not reflected in URL**
   - `Dashboard.tsx` updates `window.history` without updating the URL path. Deep linking and reloads always return to Discover mode.

2. **Search overlay uses stale data**
   - `SearchOverlay.tsx` queries `MOCK_RESOURCES` directly. Uploads and saved resources are not reflected in the overlay.

3. **PDF viewer depends on external Google Docs service**
   - Embedded viewer relies on `docs.google.com/gview`. This may fail if PDFs are blocked by CORS or are not publicly accessible.

4. **Fullscreen toggle mismatch risk**
   - `ResourceViewer.tsx` sets `isFullscreen` optimistically when requesting fullscreen. If the request fails, state can desync until the next fullscreenchange event.

5. **Security/auth is purely client-side**
   - `LoginOverlay.tsx` only validates email domain. There is no actual authentication, making it unsuitable for production without backend validation.

6. **Unused imports and dead code paths**
   - `UploadOverlay.tsx` imports `AlertCircle` and uses it, but `geminiService.ts` is unused entirely.
   - `aiService.ts` references env vars but does not use them in the mock flow.

7. **Accessibility gaps**
   - A few interactive `div` wrappers in `Dashboard.tsx` and `Library.tsx` are clickable but are not buttons or links, missing keyboard support and ARIA roles.

## Potential Improvements
- Use a router or encode view state in the URL for deep linking.
- Centralize resources in a data store/context so overlays and search stay in sync.
- Replace Google Docs Viewer with a proper PDF renderer or handle fallback gracefully.
- Add real authentication and API integration for uploads, search, analytics, and AI.
- Add basic accessibility enhancements for clickable non-button elements.

## Tests And Tooling
- No automated tests are present.
- No linting or formatting scripts are configured.

## Notable Files
- Core view: `components/Dashboard.tsx`
- Mock data: `constants.ts`
- Types: `types.ts`
- Search + AI mock: `components/SearchOverlay.tsx`, `services/aiService.ts`
- Viewer: `components/ResourceViewer.tsx`
- Upload flow: `components/UploadOverlay.tsx`

