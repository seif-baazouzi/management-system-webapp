import { validate_each_argument } from "svelte/internal";
import type Log from "~/interfaces/log";

function getDayLogs(selectedDay: number, logs: Log[]): Log[] {
    return logs.filter((l) => {
        const day = parseInt(l.date.split("-")[2].split("T")[0]);
        return selectedDay === day;
    })
}

export function formatLogs(logs: Log[]) {
    const labels: string[] = [];
    for (let i = 1; i <= 31; i++) {
        labels[i - 1] = i.toString();
    }

    const uniqLabels = new Set(logs.map(l => l.label))

    const datasets: any = [];
    for (const label of uniqLabels) {
        const values: number[] = [];
        for (let i = 1; i <= 31; i++) {
            const thisDayLogs = getDayLogs(i, logs);
            const labelSum = thisDayLogs.filter(l => l.label === label).reduce((sum, l) => sum += l.value, 0);
            values.push(labelSum);
        }

        datasets.push({ name: label, values })
    }

    return {
        labels,
        datasets,
    };
}
