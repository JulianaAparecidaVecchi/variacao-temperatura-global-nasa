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






/*async function teste() {
    const text = await loadCSV();      
    const dados = parseCSV(text);      

    console.log("Texto bruto:");
    console.log(text);

    console.log("Dados processados:");
    console.log(dados);
}

teste();*/