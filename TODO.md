# TODO - Ad compliance + ExoClick readiness

- [x] Remove auto-opening external pages from `src/app/welcome/page.tsx` (delete the `useEffect` with `window.open` calls).
- [x] Verify site has required compliance pages/links (Privacy Policy, Terms, Cookie policy/consent) and that footer links exist.
- [x] Re-check for any other deceptive UX patterns (forced redirects, popups, offerwalls, etc.).
- [x] If ExoClick scripts are added later, ensure they’re integrated per ExoClick instructions (allowed placements only).
- [x] Run `npm run lint` and `npm run build` to ensure changes compile.


