# Diggy Nation Media Library Migration

This file tracks the public media assets recovered while migrating the original Diggy Nation website into this React showcase.

## Recovered public media references

### Original Diggy Nation / UENI asset
- `https://s.uenicdn.com/assets/e0190aedcc13e0a02e88c962cf7416fff9e7c54d/static/images/6ef5615575bdfb45324f54453e091037.png`
- Source: `https://diggynation.com/`
- This is a direct media URL exposed by the original public site.

### Diggy Nation campaign / press imagery
- Mr. Lexx in red Diggy Nation shirt:
  `https://www.dancehallmag.com/assets/2024/01/Mr.Lexx-in-Diggy-Nation-shirt-e1706013048324.jpg`
- Female model in Diggy Nation shirt:
  `https://www.dancehallmag.com/assets/2024/01/Female-model-in-Diggy-Nation-Shirt-941x1200.jpg`
- Source article: `https://www.dancehallmag.com/2024/01/23/style/mr-lexx-launches-diggy-nation-clothing-line.html`

## Media groups still requiring binary recovery

The original UENI site exposes much of its imagery through generated CSS/background-image references and dynamic `Load more` storefront content. The current ChatGPT runtime can crawl those pages and recover public URLs, but its binary-writing environment cannot directly download those external files.

Still to mirror as local files once a browser/crawl connector with file extraction is connected:

- Men product photography
- Ladies Tops product photography
- Ladies Bottoms product photography
- Tumblers product photography
- Mr. Lexx profile image
- Mr. Lexx In The News thumbnails
- Historical event artwork
- Any gallery/store media hidden behind `Load more`

## Target local structure

When binaries are recovered, they should be committed under:

```
public/media/
  brand/
  products/men/
  products/ladies-tops/
  products/ladies-bottoms/
  products/tumblers/
  mr-lexx/
  press/
  events/
```

`src/data/mediaLibrary.js` is the canonical manifest for migration status and source attribution.
