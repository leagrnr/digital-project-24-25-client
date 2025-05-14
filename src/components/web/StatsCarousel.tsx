import Slider from 'react-slick';
import {
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const charts = [
    {
        title: 'Ventes (BarChart)',
        type: 'bar',
        data: [
            { name: 'Jan', value: 400 },
            { name: 'Feb', value: 300 },
            { name: 'Mar', value: 500 },
        ],
    },
    {
        title: 'Croissance (LineChart)',
        type: 'line',
        data: [
            { name: 'S1', value: 100 },
            { name: 'S2', value: 300 },
            { name: 'S3', value: 600 },
        ],
    },
    {
        title: 'Revenus (AreaChart)',
        type: 'area',
        data: [
            { name: 'T1', value: 800 },
            { name: 'T2', value: 1000 },
            { name: 'T3', value: 1200 },
        ],
    },
];

const StatsCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const renderChart = (chart) => {
        switch (chart.type) {
            case 'bar':
                return (
                    <BarChart data={chart.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={chart.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={chart.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <Slider {...settings}>
                {charts.map((chart, index) => (
                    <div key={index}>
                        <h3 style={{ textAlign: 'center' }}>{chart.title}</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            {renderChart(chart)}
                        </ResponsiveContainer>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default StatsCarousel;
