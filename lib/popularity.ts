import {SitClass} from "../types/sitTypes";
import {ClassPopularity} from "../types/derivedTypes";

export function determineClassPopularity(sitClass: SitClass) {
    if (!sitClass || sitClass.available === undefined) return ClassPopularity.Unknown
    if (sitClass.available <= 0) return ClassPopularity.High
    if (sitClass.available / sitClass.capacity >= 0.8) return ClassPopularity.Medium
    return ClassPopularity.Low
}
