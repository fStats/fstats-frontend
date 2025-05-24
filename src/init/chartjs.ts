import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    Colors,
    Legend,
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
    ChartDataLabels,
    zoomPlugin,
    Tooltip,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Colors,
    TimeScale,
    GeoFeature,
    ChoroplethController,
    ColorScale,
    SizeScale,
    ProjectionScale,
    BarElement,
    Legend
);