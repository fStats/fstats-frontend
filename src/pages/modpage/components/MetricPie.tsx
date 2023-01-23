import React, {ComponentProps} from "react";
import {G2, Pie} from "@ant-design/plots";

export function MetricPie(props: ComponentProps<any>) {
    const { data } = props;

    const G = G2.getEngine('canvas');
    const config = {
        data,
        angleField: 'count',
        colorField: 'value',
        radius: 0.55,
        legend: false,
        label: {
            type: 'spider',
            labelHeight: 40,
            formatter: (data: { value: any; percent: number; }, mappingData: { color: any; }) => {
                const group = new G.Group({});
                group.addShape({
                    type: 'circle',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 50,
                        r: 5,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 10,
                        y: 8,
                        text: `${data.value}`,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 0,
                        y: 25,
                        text: `${(data.percent * 100).toFixed(1)}%`,
                        fill: 'rgba(0, 0, 0, 0.65)',
                        fontWeight: 700,
                    },
                });
                return group;
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
    // @ts-ignore
    return <Pie {...config} />;
}