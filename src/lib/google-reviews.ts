/**
 * Google Reviews Integration Module
 * 
 * Fetches reviews from Google Places API and caches them locally.
 * 
 * Setup:
 * 1. Get a Google Cloud API key from https://console.cloud.google.com
 * 2. Enable "Places API" 
 * 3. Find your Place ID via https://developers.google.com/maps/documentation/places/web-service/place-id
 * 4. Set environment variables:
 *    - GOOGLE_PLACES_API_KEY=your_key
 *    - GOOGLE_PLACE_ID=your_place_id
 * 
 * Usage:
 *   const reviews = await fetchGoogleReviews();
 */

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  language?: string;
}

export interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  url: string;
  website?: string;
  formatted_address: string;
  formatted_phone_number?: string;
  reviews: GoogleReview[];
}

/**
 * Fetch reviews from Google Places API.
 * Returns cached data if available and fresh (within 6 hours).
 */
export async function fetchGoogleReviews(placeId?: string): Promise<{
  success: boolean;
  data?: GooglePlaceDetails;
  error?: string;
}> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const id = placeId || process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !id) {
    return {
      success: false,
      error: "Google Places API key or Place ID not configured",
    };
  }

  try {
    const fields = "name,rating,user_ratings_total,url,website,formatted_address,formatted_phone_number,reviews";
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=${fields}&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 21600 }, // Cache for 6 hours
    });

    if (!res.ok) {
      return { success: false, error: `HTTP ${res.status}: ${res.statusText}` };
    }

    const data = await res.json();

    if (data.status !== "OK") {
      return { success: false, error: `API Error: ${data.status}` };
    }

    return {
      success: true,
      data: {
        name: data.result.name || "",
        rating: data.result.rating || 0,
        user_ratings_total: data.result.user_ratings_total || 0,
        url: data.result.url || "",
        website: data.result.website || "",
        formatted_address: data.result.formatted_address || "",
        formatted_phone_number: data.result.formatted_phone_number || "",
        reviews: (data.result.reviews || []).map((review: GoogleReview) => ({
          author_name: review.author_name,
          author_url: review.author_url,
          profile_photo_url: review.profile_photo_url,
          rating: review.rating,
          relative_time_description: review.relative_time_description,
          text: review.text,
          time: review.time,
          language: review.language,
        })),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Generate a Google Reviews URL for the business.
 */
export function getGoogleReviewsUrl(placeId?: string): string {
  const id = placeId || process.env.GOOGLE_PLACE_ID;
  if (!id) return "#";
  return `https://search.google.com/local/writereviews?placeid=${id}`;
}

/**
 * Generate a Google Business Profile URL.
 */
export function getGoogleBusinessUrl(placeId?: string): string {
  const id = placeId || process.env.GOOGLE_PLACE_ID;
  if (!id) return "#";
  return `https://www.google.com/maps/place/?q=place_id:${id}`;
}

/**
 * Convert Google reviews to the internal review format.
 */
export function convertGoogleReviewsToInternal(
  googleReviews: GoogleReview[]
): Array<{
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  location: string;
  date: string;
  verified: boolean;
  visible: true;
}> {
  return googleReviews.map((review, index) => ({
    id: `google_${review.time}_${index}`,
    name: review.author_name,
    rating: review.rating,
    text: review.text,
    service: "Google Review",
    location: "",
    date: new Date(review.time * 1000).toISOString().split("T")[0],
    verified: true,
    visible: true,
  }));
}
