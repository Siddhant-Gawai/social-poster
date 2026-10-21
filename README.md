# Social Poster

A static social carousel editor for creating social media posts. Includes category and text search, favorites, local project storage, editable multi-slide designs (up to 20 slides), image uploads, three aspect ratios, and PNG export for the selected slide.

Run `python -m http.server 4173 --directory dist` from this directory and visit http://localhost:4173.

Projects and uploaded images are stored in browser localStorage. There is no account or cloud sync. Remote photography is loaded from Unsplash; uploading a local photo also works offline. Google Fonts are optional and fall back to system fonts.

## OriginKit design integration

The dark catalogue styling is locally authored based on OriginKit. The hero renders OriginKit's actual **Cluster About Glossy / CandyShoal** React component downloaded with the official CLI. Source: https://www.originkit.dev/components/cluster-about-glossy

Run `npm install` then `npm run build` after changing components. The generated bundle and Tailwind utilities are in `dist/`, so the preview needs only a static server. The component requires WebGL2; the editor works independently of it.
