export const mediaLibrary = {
  brand: [
    {
      id: 'ueni-about-image',
      label: 'Diggy Nation original UENI image asset',
      type: 'image',
      url: 'https://s.uenicdn.com/assets/e0190aedcc13e0a02e88c962cf7416fff9e7c54d/static/images/6ef5615575bdfb45324f54453e091037.png',
      sourcePage: 'https://diggynation.com/',
      origin: 'original-site',
      status: 'remote-recovered'
    }
  ],
  campaign: [
    {
      id: 'mr-lexx-red-diggy-shirt',
      label: 'Mr. Lexx in red Diggy Nation shirt',
      type: 'image',
      url: 'https://www.dancehallmag.com/assets/2024/01/Mr.Lexx-in-Diggy-Nation-shirt-e1706013048324.jpg',
      sourcePage: 'https://www.dancehallmag.com/2024/01/23/style/mr-lexx-launches-diggy-nation-clothing-line.html',
      origin: 'press-archive',
      status: 'remote-recovered'
    },
    {
      id: 'female-model-diggy-shirt',
      label: 'Female model in Diggy Nation shirt',
      type: 'image',
      url: 'https://www.dancehallmag.com/assets/2024/01/Female-model-in-Diggy-Nation-Shirt-941x1200.jpg',
      sourcePage: 'https://www.dancehallmag.com/2024/01/23/style/mr-lexx-launches-diggy-nation-clothing-line.html',
      origin: 'press-archive',
      status: 'remote-recovered'
    }
  ],
  unresolvedOriginalSiteGroups: [
    'Product photography — Men',
    'Product photography — Ladies Tops',
    'Product photography — Ladies Bottoms',
    'Product photography — Tumblers',
    'Mr. Lexx profile image',
    'Mr. Lexx In The News thumbnails',
    'Historical event artwork',
    'Any UENI gallery images hidden behind Load more'
  ]
};

export const primaryCampaignImage = mediaLibrary.campaign[0].url;
export const secondaryCampaignImage = mediaLibrary.campaign[1].url;
