# Product Update Plan - 2026-04-24

This plan is based on the handwritten product notes shared on April 24, 2026. It is scoped to the current Next.js site and the way product data is currently stored in `lib/content.ts`.

## Objective

Bring the live product content in line with the handwritten notes for boards, doors, and frames, while preserving the premium layout that already exists.

## Source Of Truth For This Pass

- Boards note: standard size, board ranges, colours, and thickness corrections
- Doors and frames note: door thickness availability, standard door sizes, frame cross-sections, colours, lengths, and the instruction to show graphical cross-sections

## Concrete Work Plan

### 1. Update board specs and board range copy

Files:
- `lib/content.ts`
- any board-specific visual components that hardcode old thicknesses or mm sizing

Changes:
- Change board standard size from `2440 mm x 1200 mm` to `8 ft x 4 ft`
- Remove `17 mm` from all board thickness references
- Update the board family details so the range structure matches the notes:
  - Omniwud / economical range / white / `18 mm, 12 mm, 8 mm, 6 mm`
  - Aashirvad PVC board / better quality / white / `18 mm, 12 mm, 8 mm`
  - Aashirvad hybrid board / best PVC board / white with yellow note preserved / `18 mm, 12 mm, 8 mm`
  - Aashirvad WPC board / high density, high strength / `18 mm, 12 mm, 8 mm`
- Update any supporting copy that still describes the old mixed `PVC boards plus one hybrid gold WPC board` setup if that no longer reflects the intended board presentation

### 2. Correct door thickness availability and size tables

Files:
- `lib/content.ts`
- `components/door-visualizer.tsx`

Changes:
- Replace the incorrect door thickness entry with note-based availability:
  - `26 mm`: ivory, grey, EcoTeak 501, teak, zigzag wood
  - `30 mm`: ivory, grey, EcoTeak 501
- Keep standard door size data aligned with the note:
  - Heights: `72, 75, 78, 81, 84, 87, 90, 93, 96`
  - Widths: `26, 28, 30, 32, 34, 36, 38`
- Update the visualizer labels so thickness availability is shown per finish group instead of as a generic shared statement

### 3. Rework frame specs using the handwritten cross-section notes

Files:
- `lib/content.ts`
- `components/frame-visualizer.tsx`
- related frame illustration assets if the current graphics are too generic

Changes:
- Replace the simplified frame section copy with the note-based range structure:
  - EcoAashirvad hybrid uPVC frames, described as high-density frame
  - EcoAashirvad Solaris, described as Highbond flagship
- Show graphical cross-sections for:
  - Moulding
  - Square
- Add the finish and section combinations captured in the notes
- Update frame lengths to:
  - `6 ft, 6.5 ft, 7 ft, 8 ft, 10 ft`
- Add the note:
  - `Enquire for other size needs`

### 4. Apply corrected frame fractions from client clarification

Confirmed correction:
- Every previously interpreted `5/8` instance from the handwritten frame note should be read as `1/2`

Update targets:
- Moulding coffee black section
- Square coffee black section sizes
- Square sandalwood ivory section sizes

Implementation rule:
- Use the corrected `1/2` fractions as the working production values unless a newer product book replaces them

### 5. Sync site copy with the new product-details reference

Files:
- `lib/content.ts`
- `context/notes/product_details.md`

Changes:
- Use `context/notes/product_details.md` as the working content reference for this update pass
- Keep names, colours, and thickness availability consistent across:
  - spec tables
  - range intro copy
  - range showcase copy
  - visualizer labels

## Recommended Execution Order

1. Update `context/notes/product_details.md` first and treat it as the reference sheet
2. Update board data in `lib/content.ts`
3. Update door data in `lib/content.ts` and `components/door-visualizer.tsx`
4. Update frame data in `lib/content.ts` and `components/frame-visualizer.tsx`
5. Review all three product pages visually
6. Finalize any remaining copy cleanup after visual review

## Open Risk

No material ambiguity remains in the handwritten notes used for this update pass. The only remaining risk is ordinary copy drift if a later product book supersedes these notes.
