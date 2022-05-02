import { RaceCategory } from "./nedsApi";

export function secondsUntil(utilDateInSeconds: number): number {
  return Math.floor(utilDateInSeconds - new Date().getTime() / 1000);
}

export function getRaceCategoryName(category: RaceCategory): string {
  switch (category) {
    case RaceCategory.Greyhound:
      return "Greyhound";
    case RaceCategory.Harness:
      return "Harness";
    case RaceCategory.Horse:
      return "Horse";
  }
}
