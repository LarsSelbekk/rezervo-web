import { NextApiRequest, NextApiResponse } from "next";
import { fetchSitWeekSchedule } from "../../lib/integration/sit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const weekOffset = JSON.parse(req.body)["weekOffset"];
    if (weekOffset === undefined) {
        return res.status(400).json({ message: "weekOffset is a required parameter" });
    }

    const result = await fetchSitWeekSchedule(weekOffset);
    return res.json(result);
}
