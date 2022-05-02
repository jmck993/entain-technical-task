// NOTE: This API is not exhaustive and may require review from official docs.

export enum RaceCategory {
  Greyhound = "9daef0d7-bf3c-4f50-921d-8e818c60fe61",
  Harness = "161d9be2-e909-4326-8c2c-35ed71fb460b",
  Horse = "4a2788f8-e825-4d36-9894-efd4baf1cfae",
}

export interface NedsRaceSummary {
  advertised_start: {
    seconds: number;
  };
  category_id: RaceCategory;
  meeting_id: string;
  meeting_name: string;
  race_form: unknown;
  race_id: string;
  race_name: string;
  race_number: number;
  venue_country: string;
  venue_id: string;
  venue_name: string;
  venue_state: string;
}

export interface NedsRacingData {
  next_to_go_ids: string[];
  race_summaries: Record<string, NedsRaceSummary>;
}

interface NedsRacingResponse {
  data: NedsRacingData;
  message: string;
  status: number;
}

/**
 * Checks that a given response roughly matches what is expected from a {@link NedsRacingResponse}.
 * @param response An object to check.
 * @returns If the object is a valid {@link NedsRacingResponse}.
 */
function isNedsRacingResponse(response: any): response is NedsRacingResponse {
  return "data" in response && "message" in response && "status" in response;
}

/**
 * Builds a URL to query upcoming races.
 *
 * @param count The amount of upcoming races to query.
 */
function buildNedsRestRacingUrl(count: number): string {
  const url = new URL("https://api.neds.com.au");
  url.pathname = "/rest/v1/racing/";
  url.searchParams.set("method", "nextraces");
  url.searchParams.set("count", count.toString());
  return url.toString();
}

export async function getNedsRaces(count: number) {
  const url = buildNedsRestRacingUrl(count);
  const raw = await fetch(url, { method: "GET" });
  const response = await raw.json();
  if (!isNedsRacingResponse(response)) {
    throw new Error(`Unexpected data from '${url}'`);
  }
  return response;
}
