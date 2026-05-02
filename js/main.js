import { createChart } from "./chart.js";
import {
    loadCSV,
    parseCSV,
    getMonthData,
    getTopBottomExtremes,
    getAverageGrouped
} from "./utils.js";

async function main() {

    const csvText = await loadCSV('./data/GLB.Ts+dSST.csv');
    const csvData = parseCSV(csvText);

    const selectYear = document.getElementById('selectYear');

    for (let i = 0; i < csvData.length; i++) {
        const option = document.createElement('option');
        option.value = csvData[i].Year;
        option.textContent = csvData[i].Year;
        selectYear.appendChild(option);
    }

    let year = 2019;

    let monthData = getMonthData(csvData, year);

    const chartMonth = createChart(
        document.getElementById('chartByMonth'),
        'line',
        monthData.labels.slice(1),
        'Temperatura global',
        monthData.values.slice(1)
    );

    selectYear.value = year;

    selectYear.onchange = function (e) {

        year = e.target.value;

        monthData = getMonthData(csvData, year);

        chartMonth.data.labels = monthData.labels.slice(1);
        chartMonth.data.datasets[0].data = monthData.values.slice(1);

        chartMonth.update();
    };

    const selectQuantity = document.getElementById('selectQuantity');

    let limit = 3;

    let extremes = getTopBottomExtremes(csvData, limit);

    const chartExtreme = createChart(
        document.getElementById('chartExtremes'),
        'bar',
        extremes.map(i => i.month + '/' + i.year),
        'Extremos',
        extremes.map(i => i.value)
        

    );
        document.getElementById('maxAnomaly').textContent = extremes[3].value;
        document.getElementById('mixAnomaly').textContent = extremes[0].value;

    selectQuantity.value = limit;

    selectQuantity.onchange = function (e) {

        limit = Number(e.target.value);

        extremes = getTopBottomExtremes(csvData, limit);

        chartExtreme.data.labels = extremes.map(i => i.month + '/' + i.year);
        chartExtreme.data.datasets[0].data = extremes.map(i => i.value);
        
        chartExtreme.update();
        
    };

    const selectAverage = document.getElementById('selectAverage');

    let interval = 1;

    let averages = getAverageGrouped(csvData, interval);

    const chartAverage = createChart(
        document.getElementById('chartAverage'),
        'line',
        averages.map(i => i.label),
        'Média global',
        averages.map(i => i.average),
        {
                fill: true
            
        }
    );

    selectAverage.value = interval;

    selectAverage.onchange = function (e) {

        interval = Number(e.target.value);

        averages = getAverageGrouped(csvData, interval);

        chartAverage.data.labels = averages.map(i => i.label);
        chartAverage.data.datasets[0].data = averages.map(i => i.average);

        chartAverage.update();
    };
}

main();