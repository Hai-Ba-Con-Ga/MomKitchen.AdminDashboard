import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import useConfig from '@/base/hooks/useConfig';
import OrderApi from '@/modules/order/service/order.api';
import { FilterOps } from '@/types/common/pagination/FilterState';
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project import
// import useConfig from 'hooks/useConfig';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: true
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //
interface Props {
  onWeeksaleChange?: (sale : number)=>void
}
const MonthlyBarChart = ({onWeeksaleChange}:Props) => {
  const previousIndex = [0,1,2,3,4,5,6];
  const listSevenPreviousIsoDates = useMemo(()=>previousIndex.map((i)=>{
    const currentDate = new Date(); // Get the current date
    currentDate.setDate(currentDate.getDate() - i); // Subtract the index from the current date to get the previous date
    const isoDate = currentDate.toISOString().split('T')[0]; // Format the date as ISO (YYYY-MM-DD)
    return isoDate;
  }),[]) 
  console.log(listSevenPreviousIsoDates);
  
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const fetchOrderSevenDate = async ()=>{
    const rawResult = await Promise.all(listSevenPreviousIsoDates?.map(date => OrderApi.getOrders({paging:{pageIndex:0,pageSize:1 }, filter: {
      from : {
        value : date+"T00:00:00.000Z",
        op : FilterOps.GREATER_THAN_EQUAL,
        field: "FromDate"
      },
      to : {
        value : date+"T23:59:59.000Z",
        op : FilterOps.LESS_THAN_EQUAL,
        field: "ToDate"
      },
    }})));
    console.log("raw result => ", rawResult);
    const result = rawResult.map(res => res.totalCount);
    console.log("result => ", result);
    onWeeksaleChange(rawResult?.reduce((prev,cur) => prev+= cur?.data?.reduce((prev,cur)=>prev+=cur.totalPrice,0)??0,0))
    setSeries([{
      data : result
    }])
  }
  useEffect(()=> {
    fetchOrderSevenDate();
  },[listSevenPreviousIsoDates])
  const [series,setSeries] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78]
    }
  ]);

  const [options, setOptions] = useState<ChartProps>(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: mode === 'dark' ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart  options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyBarChart;
