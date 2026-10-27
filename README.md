# Social Poster

A static social carousel editor for creating social media posts. Includes category and text search, favorites, local project storage, editable multi-slide designs (up to 20 slides), image uploads, three aspect ratios, and PNG export for the selected slide.

Run `python -m http.server 4173 --directory dist` from this directory and visit http://localhost:4173.

Projects and uploaded images are stored in browser localStorage. There is no account or cloud sync. Remote photography is loaded from Unsplash; uploading a local photo also works offline. Google Fonts are optional and fall back to system fonts.

## OriginKit design integration

The dark catalogue styling is locally authored based on OriginKit. The hero renders OriginKit's actual **Cluster About Glossy / CandyShoal** React component downloaded with the official CLI. Source: https://www.originkit.dev/components/cluster-about-glossy

Run `npm install` then `npm run build` after changing components. The generated bundle and Tailwind utilities are in `dist/`, so the preview needs only a static server. The component requires WebGL2; the editor works independently of it.

## Layered post templates

The Halloween collection includes portrait stickers, scrapbook collages, ornate invitations, framed photo strips, and three-photo stacks. Each element is editable: select it on the canvas or in the layer list, drag to move it, change its dimensions and rotation, or reorder and duplicate it. Photo layers support white or polaroid frames and black-and-white treatment. Upload multiple photos to fill empty frames. Transparent PNG uploads retain their alpha channel; automatic background removal is not included.

Use Preview for a swipeable carousel. Export the selected slide as PNG or all slides in one ZIP. Photos stay in browser storage and are not uploaded to a backend. Browser storage has a size limit, so export important work.

Run `npm run check` and `npm test` to verify syntax and layer selection, rotation, drag boundaries, ordering, and independent template state.

## Patch history

### October 27, 2026

Ctrl/Cmd+K now keeps focus in an open editor or carousel preview instead of trying to focus the gallery search behind the dialog. The shortcut still focuses search from the gallery.

### October 24, 2026

Fixed keyboard interaction on template cards: pressing Enter or Space on a Favorite button toggles the favorite without also opening the editor. Focusing the card itself and pressing Enter or Space still opens the design.

### October 23, 2026

Text layer names now update in the Layers panel as you type, making it easier to identify the text you are editing. The text field keeps focus and the canvas continues to update live.
