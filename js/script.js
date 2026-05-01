


async function loadCSV() {
    const csv = await fetch('data/GLB.Ts+dSST.csv');
    const csvText = await csv.text();
    return csvText;
    
}


function parseCSV(text){
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

async function teste() {
    const text = await loadCSV();      // carrega o CSV
    const dados = parseCSV(text);      // transforma

    console.log("Texto bruto:");
    console.log(text);

    console.log("Dados processados:");
    console.log(dados);
}

teste();