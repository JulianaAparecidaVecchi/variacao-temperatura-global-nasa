import { createChart } from "./chart.js";
import { loadCSV, parseCSV, getMonthData } from "./utils.js";

async function main() {
    const csvText = await loadCSV('./data/GLB.Ts+dSST.csv');
    const csvData = parseCSV(csvText);

    const select = document.getElementById('selectYear');

    csvData.forEach(row => {
        const option = document.createElement('option');

        option.value = row.Year;
        option.textContent = row.Year;

        select.appendChild(option);
    });
    //Gráfico de meses 
    const initialYear = 2019;

    let dataMonth = getMonthData(csvData, initialYear);

    const chart = createChart(
        document.getElementById('chartByMonth'),
        'line',
        dataMonth.labels.slice(1),
        `Temperatura global em ${initialYear}`,
        dataMonth.values.slice(1)
    );

    select.value = initialYear;

    select.addEventListener('change', (e) => {
        const year = e.target.value;

        dataMonth = getMonthData(csvData, year);

        chart.data.labels = dataMonth.labels.slice(1);

        chart.data.datasets[0].data = dataMonth.values.slice(1);

        chart.data.datasets[0].label = `Temperatura global em ${year}`;

        chart.update();
    });

    
}

main();