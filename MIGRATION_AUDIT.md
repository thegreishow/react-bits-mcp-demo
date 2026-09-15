# Diggy Nation public-site migration audit

Source audited: https://diggynation.com/
Audit date: 2026-09-15

## Public sections discovered
- Shop AVAILABLE IN THE U.S ONLY
- About Us
- Meet Mr. Lexx
- Mr. Lexx In The News
- ONE NATION
- Reviews
- Follow Us
- Contact Us / Social Media
- Events
- Merchant Policies
- Terms and Conditions / Legal

## Store categories found
- Men
- Ladies Tops
- Ladies Bottoms
- Tumblers

## Products captured in this migration pass
- Olive Green Exclusive Diggy Nation Hoodie — $74.99
- Black Diggy Nation UNISEX T-Shirt — $29.99
- Gray Diggy Nation UNISEX T-Shirt — $29.99
- Red Diggy Nation UNISEX T-Shirt — $29.99
- White Diggy Nation UNISEX T-Shirt — $29.99
- Dark Purple Diggy Nation UNISEX T-Shirt — $29.99
- Yellow Diggy Nation UNISEX T-Shirt — $29.99
- Coral Fashion Shorts — $39.99

The old site uses a Load More store experience, so additional products may exist behind UI states that are not consistently exposed to the public crawler. We should compare against the UENI dashboard/export before calling the product migration 100% complete.

## Core brand copy preserved
- Diggy Nation is a privately held fashion lifestyle company created by Dancehall Reggae Artist Mr. Lexx aka Dag Diggy.
- Mr. Lexx launched his signature collection Diggy Nation in 2022.
- Customer-satisfaction positioning around affordable pricing, quality above price, and responsive customer service.

## Commerce rules preserved
- Online merchandise currently presented as United States only.
- Custom colors handled by phone.
- Public site says special custom orders may take up to 2 weeks.
- Merchant policy lists USPS delivery as free.
- Merchant policy separately lists 3–5 business days for custom orders and also a 2-week custom-order payment/processing note. This inconsistency should be resolved before production launch.

## Contact information preserved
- Fort Lauderdale, Florida, 33063
- (954) 548-7500
- [email protected]
- Instagram / Facebook / TikTok links exist on the old site.

## Reviews
The public reviews page advertises 77 reviews. A substantial visible set was crawled, including reviews from 2023, 2024 and 2026. Selected testimonials are in `src/data/siteContent.js`. The original reviews page should remain the reference until every review is exported from UENI or Google reviews directly.

## Events preserved
15 historical event listings from June 2022 through July 2023 are recorded in `src/data/siteContent.js`.

## Mr. Lexx press archive preserved
17 visible entries from May 2021 through October 2023 are recorded in `src/data/siteContent.js`, including:
- Diggy Nation launch article
- DI SOUND OFF appearance
- Full 100 event coverage
- Good Wife / D’Angel coverage
- Like I Never Left album coverage
- VP Records contract stories

## Mr. Lexx biography
The public biography contains a long career overview including East Kingston origins, early deejaying, acting/dance background, Sting 1998, Sumfest 1999, VP Records history and a long song list. A condensed structured version is preserved in `src/data/siteContent.js`; the original page remains the source for full archival copy.

## Still to verify from owner/admin source
- Complete hidden/load-more product inventory
- Every size/color variant and stock state
- Original product images in highest available resolution
- All 77 review records in structured form
- Any unpublished/draft events or news posts
- Original form destinations / CRM behavior
- Exact social-profile URLs if changed since crawl
- Payment provider configuration and order history

This audit is intended to prevent content loss while the React redesign proceeds. It is not a claim that UENI backend data has been exported.