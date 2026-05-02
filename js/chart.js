export function createChart(
  ctx,
  type,
  labels,
  datasetLabel,
  data,
  options = {}
) {
  return new Chart(ctx, {
    type: type,

    data: {
      labels: labels,

      datasets: [
        {
          label: datasetLabel,
          data: data,
          borderWidth: 1
        }
      ]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },

      ...options
    }
  });
}

function updateChart(chart, config) {
    if (chart) {
        chart.destroy();
    }

    return createChart(
        config.element,
        config.type,
        config.labels,
        config.label,
        config.data,
        config.options
    );
}
