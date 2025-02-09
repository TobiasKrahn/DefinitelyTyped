import { Chart, ChartData, Point, ChartColor } from 'chart.js';

// alternative:
// import chartjs = require('chart.js');
// => chartjs.Chart

const plugin = {
    afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => { },
};

const ctx = new CanvasRenderingContext2D();

const chart: Chart = new Chart(ctx, {
    type: 'bar',
    plugins: [plugin, plugin],
    data: {
        labels: ['group 1'],
        datasets: [
            {
                backgroundColor: '#000000',
                hoverBackgroundColor: ctx.createLinearGradient(0, 0, 0, 100),
                hoverBorderColor: ctx.createLinearGradient(0, 0, 0, 100),
                borderWidth: 1,
                label: 'test',
                data: [1, null, 3],
            },
        ],
    },
    options: {
        hover: {
            intersect: true,
        },
        onHover(ev: MouseEvent, points: any[]) {
            return;
        },
        title: {
            text: ['foo', 'bar'],
        },
        tooltips: {
            filter: data => Number(data.yLabel) > 0,
            intersect: true,
            mode: 'index',
            itemSort: (a, b) => Math.random() - 0.5,
            position: 'average',
            caretPadding: 2,
            displayColors: true,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            titleAlign: 'center',
            callbacks: {
                title: ([point]) => (point.label ? point.label.substring(0, 2) : 'title'),
                label(tooltipItem) {
                    const { value, x, y, label } = tooltipItem;
                    return `${label}(${x}, ${y}) = ${value}`;
                },
            },
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        callback: Math.floor,
                    },
                    minBarLength: 2,
                    gridLines: {
                        display: false,
                        borderDash: [5, 15],
                        borderDashOffset: 2,
                        zeroLineBorderDash: [5, 15],
                        zeroLineBorderDashOffset: 2,
                        lineWidth: [1, 2, 3],
                    },
                },
            ],
        },
        legend: {
            display: true,
            labels: {
                usePointStyle: true,
                padding: 40,
            },
        },
        devicePixelRatio: 2,
        plugins: {
            bar: false,
            foo: {},
        },
    },
});
chart.update({ duration: 500, lazy: false, easing: 'linear' });

console.log(chart.getDatasetMeta(0));

console.log(chart.ctx && chart.ctx.font);
console.log(chart.canvas && chart.canvas.tagName);
if (chart.chartArea) {
    console.log(chart.chartArea.top);
    console.log(chart.chartArea.right);
    console.log(chart.chartArea.bottom);
    console.log(chart.chartArea.left);
}

// Testing custom legends
chart.config.options = {
    ...chart.config.options,
    legend: {
        display: false,
    },
    legendCallback: () => 'legend replacement',
};
chart.update();
const customLegend = chart.generateLegend();
console.log(customLegend === 'legend replacement');

// Testing radial chart
const tickOptions: Chart.LinearTickOptions = {
    max: 100,
    stepSize: 33,
    display: false,
    beginAtZero: true,
};
const scaleOptions: Chart.RadialLinearScale = {
    ticks: tickOptions,
    lineArc: false,
    display: false,
    scaleLabel: {
        display: false,
        lineHeight: 1,
        padding: 0,
    },
};
const radarChartOptions: Chart.RadialChartOptions = {
    legend: { display: false },
    scale: scaleOptions,
    responsive: true,
};
const chartConfig: Chart.ChartConfiguration = {
    type: 'radar',
    data: {
        labels: ['#apples', '#pears', '#apricots', '#acorns', '#amigas', '#orics'],
        datasets: [
            {
                label: 'test',
                lineTension: 0.15,
                data: [1, 1, 2, 3, 5],
                backgroundColor: '#37738353',
                borderColor: '#37738353',
                borderWidth: 3,
                borderCapStyle: 'round',
                fill: true,
            },
        ],
    },
    options: radarChartOptions,
};
const radialChart: Chart = new Chart(new CanvasRenderingContext2D(), chartConfig);
radialChart.update();

console.log(radialChart.ctx && radialChart.ctx.font);
console.log(radialChart.canvas && radialChart.canvas.tagName);
if (radialChart.chartArea) {
    console.log(radialChart.chartArea.top);
    console.log(radialChart.chartArea.right);
    console.log(radialChart.chartArea.bottom);
    console.log(radialChart.chartArea.left);
}

// http://www.chartjs.org/docs/latest/configuration/tooltip.html#position-modes
Chart.Tooltip.positioners.custom = (elements: any[], eventPosition: Point) => {
    return {
        x: eventPosition.x,
        y: eventPosition.y + 10,
    };
};

if (radialChart.width !== null && radialChart.height !== null) {
    console.log('area', radialChart.width * radialChart.height);
}
if (radialChart.aspectRatio !== null) {
    console.log(radialChart.aspectRatio * 2);
}
console.log(radialChart.options === radialChart.config.options);

const chartWithScriptedOptions = new Chart(new CanvasRenderingContext2D(), {
    type: "bar",
    data: {
        labels: ["a", "b", "c", "d", "e"],
        datasets: [{
            label: "test",
            data: [1, 3, 5, 4, 2],
            backgroundColor: ({ dataset, dataIndex }): ChartColor => {
                if (dataset === undefined || dataset.data === undefined || dataIndex === undefined) {
                    return "black";
                }
                const value = dataset.data[dataIndex];
                if (typeof value !== "number") {
                    return "black";
                }
                return value > 3 ? "red" : "green";
            }
        }],
    }
});
