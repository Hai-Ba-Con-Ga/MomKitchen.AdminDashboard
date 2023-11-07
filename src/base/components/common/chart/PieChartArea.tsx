import useAreaData from '@/modules/area/hooks/useAreaData';
import { useEffect, useState } from 'react';
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';


const PieChartArea = () => {
const [options, setOptions] = useState<ChartProps>({
    type: "pie",
    options: {
        plotOptions: {
           pie: {
            expandOnClick: true
           }
        }
    },
    labels: [],
    series: [], // Example data values
  });
const {areaData} = useAreaData();
useEffect(()=>{
    if(areaData?.length > 0){
        setOptions((prev)=>({...prev, labels: areaData?.map(area => area.name)??[], series: areaData?.map(area=>area.noOfKitchens)??[]}));
    }
},[areaData])

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options?.series??[]} type="pie" height={430} />
    </div>
  )
}

export default PieChartArea