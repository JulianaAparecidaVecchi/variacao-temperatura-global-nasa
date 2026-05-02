export async function loadCSV(csvName) {
    const csv = await fetch(csvName);
    const csvText = await csv.text();
    return csvText;
    
}

export function parseCSV(text){
    const row = text.split('\n').filter(row => row.trim() != '');
    return row.slice(1).map(row => {
        const [Year,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec] = row.split(',')
        .map(row => row.trim().replace(/\s+/g,''))
        .map(row => {
            const number = Number(row);
            return isNaN(row)? null : row}
        );
        return{
            Year: Number(Year),
            Jan: Number(Jan),
            Feb: Number(Feb),
            Mar: Number(Mar),
            Apr: Number(Apr),
            May: Number(May),
            Jun: Number(Jun),
            Jul: Number(Jul),
            Aug: Number(Aug),
            Sep: Number(Sep),
            Oct: Number(Oct),
            Nov: Number(Nov),
            Dec: Number(Dec)
        };
    });
}

export function getMonthData(array, year){
    const row = array.find(row => row.Year == year);
    const entries = Object.entries(row).filter(e => e[1] != 0);
    return{
        labels: entries.map(row => row[0]),
        values: entries.map(row => row[1])
    }
}

export function getTopBottomExtremes(array, limit = 3) {

    const results = [];

    array.forEach(row => {

        Object.entries(row)
            .slice(1)
            .forEach(([month, value]) => {

                const numberValue = Number(value);

                if (!isNaN(numberValue)) {

                    results.push({
                        year: row.Year,
                        month,
                        value: numberValue
                    });

                }
            });

    });

    results.sort((a, b) => a.value - b.value);

    const bottom = results.slice(0, limit);

    const top = results
        .slice(-limit)
        .reverse();

    return [...bottom, ...top];
}

export function getAverageGrouped(array, interval = 1) {

    const yearly = [];

  
    array.forEach(row => {

        const values = Object.values(row).slice(1);

        const avg =
            values.reduce((a, b) => a + b, 0) / values.length;

        yearly.push({
            year: row.Year,
            average: avg
        });
    });

    
    const grouped = [];

    for (let i = 0; i < yearly.length; i += interval) {

        const chunk = yearly.slice(i, i + interval);

        const avg =
            chunk.reduce((a, b) => a + b.average, 0) / chunk.length;

        const start = chunk[0].year;
        const end = chunk[chunk.length - 1].year;

        grouped.push({
            label: interval === 1
                ? String(start)
                : `${start}-${end}`,
            average: avg
        });
    }

    return grouped;
}
