import { getDateTime } from "@/lib/helpers/date";
import { RezervoClass, RezervoDaySchedule, RezervoSchedule, RezervoWeekSchedule } from "@/types/integration";
import {
    RezervoClassDTO,
    RezervoDayScheduleDTO,
    RezervoScheduleDTO,
    RezervoWeekScheduleDTO,
} from "@/types/serialization";

function deserializeClass(classDTO: RezervoClassDTO): RezervoClass {
    return {
        ...classDTO,
        startTime: getDateTime(classDTO.startTime),
        endTime: getDateTime(classDTO.endTime),
    };
}

function deserializeDaySchedule(dayScheduleDTO: RezervoDayScheduleDTO): RezervoDaySchedule {
    return {
        date: getDateTime(dayScheduleDTO.date),
        classes: dayScheduleDTO.classes.map(deserializeClass),
    };
}

export function deserializeWeekSchedule(weekScheduleDTO: RezervoWeekScheduleDTO): RezervoWeekSchedule {
    return weekScheduleDTO.map(deserializeDaySchedule);
}
export function deserializeSchedule(scheduleDTO: RezervoScheduleDTO): RezervoSchedule {
    return Object.keys(scheduleDTO)
        .map((weekOffset) => {
            const weekSchedule = scheduleDTO[Number(weekOffset)];
            if (weekSchedule === undefined) {
                throw new Error(`Invalid week schedule for week offset ${weekOffset}`);
            }
            return {
                [Number(weekOffset)]: deserializeWeekSchedule(weekSchedule),
            };
        })
        .reduce((acc, next) => ({ ...acc, ...next }), {});
}
