import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    Colors,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip
} from "chart.js";
import {ChoroplethController, ColorScale, GeoFeature, ProjectionScale, SizeScale} from "chartjs-chart-geo";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(
    ArcElement,
    BarElement,
    CategoryScale,
    ChartDataLabels,
    ChoroplethController,
    ColorScale,
    Colors,
    GeoFeature,
    LineElement,
    LinearScale,
    PointElement,
    ProjectionScale,
    SizeScale,
    TimeScale,
    Tooltip,
    zoomPlugin,
);