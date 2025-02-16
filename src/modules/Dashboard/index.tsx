import { motion } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import TransparentLoader from '@/components/Simple/TransparentLoader'
import { createSwapy, Swapy } from 'swapy'
import { Chart } from 'primereact/chart'
import { useIntl } from 'react-intl'
import { setBreadCrumb } from '@/global/redux/actions'
import { AppDispatch } from '@/global/redux/store'
import { useDispatch } from 'react-redux'

import './index.scss'
const Dashboard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading] = useState(false);
    const swapyRef = useRef<Swapy | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [chartData1, setChartData1] = useState({});
    const [chartOptions1, setChartOptions1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartOptions3, setChartOptions3] = useState({});
    const [chartData4, setChartData4] = useState({});
    const [chartOptions4, setChartOptions4] = useState({});
    const {messages} = useIntl();
    const breadItems = [{ label: String(messages.dashboard_title) }];

    useEffect(() => {
        dispatch(setBreadCrumb({breadCrumb : breadItems}))
        const data1 = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options1 = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData1(data1);
        setChartOptions1(options1);


        const documentStyle2 = getComputedStyle(document.documentElement);
        const textColor2 = documentStyle2.getPropertyValue('--text-color');
        const textColorSecondary2 = documentStyle2.getPropertyValue('--text-color-secondary');
        const surfaceBorder2 = documentStyle2.getPropertyValue('--surface-border');
        const data2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Dataset 1',
                    backgroundColor: documentStyle2.getPropertyValue('--blue-500'),
                    data: [50, 25, 12, 48, 90, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle2.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34]
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle2.getPropertyValue('--yellow-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };
        const options2 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor2
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary2
                    },
                    grid: {
                        color: surfaceBorder2
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary2
                    },
                    grid: {
                        color: surfaceBorder2
                    }
                }
            }
        };

        setChartData2(data2);
        setChartOptions2(options2);

        const documentStyle3 = getComputedStyle(document.documentElement);
        const data3 = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle3.getPropertyValue('--blue-500'), 
                        documentStyle3.getPropertyValue('--yellow-500'), 
                        documentStyle3.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle3.getPropertyValue('--blue-400'), 
                        documentStyle3.getPropertyValue('--yellow-400'), 
                        documentStyle3.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options3 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData3(data3);
        setChartOptions3(options3);


        const documentStyle4 = getComputedStyle(document.documentElement);
        const textColor4 = documentStyle4.getPropertyValue('--text-color');
        const textColorSecondary4 = documentStyle4.getPropertyValue('--text-color-secondary');
        const data4 = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle4.getPropertyValue('--bluegray-400'),
                    pointBackgroundColor: documentStyle4.getPropertyValue('--bluegray-400'),
                    pointBorderColor: documentStyle4.getPropertyValue('--bluegray-400'),
                    pointHoverBackgroundColor: textColor4,
                    pointHoverBorderColor: documentStyle4.getPropertyValue('--bluegray-400'),
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle4.getPropertyValue('--pink-400'),
                    pointBackgroundColor: documentStyle4.getPropertyValue('--pink-400'),
                    pointBorderColor: documentStyle4.getPropertyValue('--pink-400'),
                    pointHoverBackgroundColor: textColor4,
                    pointHoverBorderColor: documentStyle4.getPropertyValue('--pink-400'),
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        const options4 = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor4
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary4
                    }
                }
            }
        };

        setChartData4(data4);
        setChartOptions4(options4);

        if (containerRef.current) {
          swapyRef.current = createSwapy(containerRef.current, {
          })
    
          swapyRef.current.onBeforeSwap((event) => {
            console.log('beforeSwap', event)
            // This is for dynamically enabling and disabling swapping.
            // Return true to allow swapping, and return false to prevent swapping.
            return true
          })
    
          swapyRef.current.onSwapStart((event) => {
            console.log('start', event);
          })
          swapyRef.current.onSwap((event) => {
            console.log('swap', event);
          })
          swapyRef.current.onSwapEnd((event) => {
            console.log('end', event);
          })
        }
        return () => {
          swapyRef.current?.destroy()
        }
      }, [])

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"    
            >
                {isLoading && (
                    <div className="overlay">
                        <TransparentLoader />
                    </div>
                )}
                <div className="mt-5 flex flex-col items-center justify-center">
                    <div className="bg-transparent w-full lg:max-w-xl sm:max-w-lg">
                        <h2 className="text-xl font-bold text-center">
                            {String(messages.dashboard_title)}
                        </h2>
                    </div>
                </div>               
                <div className="swcontainer gap-y-5" ref={containerRef}>
                    <div className="top gap-4 flex lg:flex-row flex-col">
                        <div className="h-80 lg:basis-2/3" data-swapy-slot="a">
                            <div className="item item-a" data-swapy-item="a">
                                <Chart type="bar" data={chartData1} options={chartOptions1} className="h-80 w-full flex justify-center items-center" />
                            </div>
                        </div>
                        <div className="h-80 lg:basis-full" data-swapy-slot="b">
                            <div className="item item-b" data-swapy-item="b">
                                <Chart type="pie" data={chartData3} options={chartOptions3}  className="h-80 w-full flex justify-center items-center" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bottom gap-4 flex lg:flex-row flex-col">
                        <div className="h-80 lg:basis-2/3" data-swapy-slot="c">
                            <div className="item item-c self-center place-content-center place-items-center" data-swapy-item="c">
                                <Chart type="bar" data={chartData2} options={chartOptions2} className="h-80 w-full flex justify-center items-center"  />
                            </div>
                        </div>
                        <div className="h-80 lg:basis-full" data-swapy-slot="d">
                            <div className="item item-a " data-swapy-item="d">
                                <Chart type="radar" data={chartData4} options={chartOptions4}  className="h-80 w-full flex justify-center items-center"/>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Dashboard