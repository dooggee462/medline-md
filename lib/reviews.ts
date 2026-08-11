import { SITE, type Locale } from "./site";

/**
 * Recenzii reale din Google Business Profile, via Places API (New).
 *
 * Setup (o singură dată):
 *  1. Google Cloud Console → activează „Places API (New)" → creează o cheie API
 *  2. Restricționează cheia la Places API (altfel o poate folosi oricine o găsește)
 *  3. Pune cheia în .env.local ca GOOGLE_PLACES_API_KEY
 *  4. Pune Place ID-ul în SITE.googlePlaceId (lib/site.ts)
 *
 * Fără cheie sau fără Place ID, funcția întoarce null și secțiunea de recenzii
 * pur și simplu nu se afișează — site-ul rămâne funcțional.
 *
 * ⚠️ Google returnează MAXIM 5 recenzii și nu permite alegerea lor.
 */

export type GoogleReview = {
  author: string;
  photo?: string;
  rating: number;
  text: string;
  /** ex. „acum o lună” — vine gata tradus de Google */
  when: string;
  /** link către recenzia pe Google — atribuirea e cerută de termenii Google */
  url?: string;
};

export type GoogleReviews = {
  rating: number;
  total: number;
  items: GoogleReview[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  }[];
};

/**
 * Recenziile pentru limba dată. Rezultatul e cache-uit 6 ore — recenziile apar
 * rar, iar Places API se plătește la cerere.
 */
export async function getGoogleReviews(
  locale: Locale
): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = SITE.googlePlaceId;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=${locale}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 21600 }, // 6h
      }
    );
    if (!res.ok) {
      console.error(`[reviews] Places API ${res.status}: ${await res.text()}`);
      return null;
    }

    const data = (await res.json()) as PlacesResponse;
    const items = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "",
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        // textul tradus în limba cerută, cu revenire la original
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        when: r.relativePublishTimeDescription ?? "",
        url: r.authorAttribution?.uri,
      }))
      // recenziile fără text (doar stele) n-au ce arăta
      .filter((r) => r.text && r.author);

    if (!items.length) return null;

    return {
      rating: data.rating ?? 0,
      total: data.userRatingCount ?? items.length,
      items,
    };
  } catch (e) {
    console.error("[reviews] Places API a eșuat:", e);
    return null;
  }
}
