import axiosClient from '@/base/service/axiosClient';
import { useEffect, useState } from 'react'



const dates = ['2023-10-30', '2023-10-31', '2023-11-01','2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05']
const months = [
  {
    from: '2023-01-01T00:00:00.000',
    to: '2023-01-31T23:59:59.000'
  },
  {
    from: '2023-02-01T00:00:00.000',
    to: '2023-02-28T23:59:59.000'
  },
  {
    from: '2023-03-01T00:00:00.000',
    to: '2023-03-31T23:59:59.000'
  },
  {
    from: '2023-04-01T00:00:00.000',
    to: '2023-04-30T23:59:59.000'
  },
  {
    from: '2023-05-01T00:00:00.000',
    to: '2023-05-31T23:59:59.000'
  },
  {
    from: '2023-06-01T00:00:00.000',
    to: '2023-06-30T23:59:59.000'
  },
  {
    from: '2023-07-01T00:00:00.000',
    to: '2023-07-31T23:59:59.000'
  },
  {
    from: '2023-08-01T00:00:00.000',
    to: '2023-08-31T23:59:59.000'
  },
  {
    from: '2023-09-01T00:00:00.000',
    to: '2023-09-30T23:59:59.000'
  },
  {
    from: '2023-10-01T00:00:00.000',
    to: '2023-10-31T23:59:59.000'
  },
  {
    from: '2023-11-01T00:00:00.000',
    to: '2023-11-30T23:59:59.000'
  },
  {
    from: '2023-12-01T00:00:00.000',
    to: '2023-12-31T23:59:59.000'
  }
];
const useAnalytics = (type : "week" | "month") => {
  const [kitchenAnaWeek, setKitchen] = useState<number[]>([]);
  const [cusAnaWeek, setCus] = useState<number[]>([]);
  const fetchKitchenWeek = async () => {
    const rawRes = await Promise.all(months.map(m => axiosClient.get("/kitchen", {params: {
      FromDate : m.from,
      ToDate : m.to
    }}).then(d=>d.data).then(d => d?.totalCount)))
    setKitchen(rawRes)
  }
  const fetchCustomerWeek = async () => {
    const rawRes = await Promise.all(months.map(m => axiosClient.get("/customer", {params: {
      FromDate : m.from,
      ToDate : m.to
    }}).then(d=>d.data).then(d => d?.totalCount)))
    setCus(rawRes);
  }

  const fetchKitchenMonth = async () => {
    const rawRes = await Promise.all(dates.map(d => axiosClient.get("/kitchen", {params: {
      FromDate : d+"T00:00:00.000",
      ToDate : d+"T23:59:59.000"
    }}).then(d=>d.data).then(d => d?.totalCount)))
    setKitchen(rawRes)
  }
  const fetchCustomerMonth = async () => {
    const rawRes = await Promise.all(dates.map(d => axiosClient.get("/customer", {params: {
      FromDate : d+"T00:00:00.000",
      ToDate : d+"T23:59:59.000"
    }}).then(d=>d.data).then(d => d?.totalCount)))
    setCus(rawRes);
  }
  useEffect(()=>{
    if(type =="month"){
      fetchKitchenWeek();
      fetchCustomerWeek();
    }else {
      fetchKitchenMonth();
      fetchCustomerMonth();
    }
  },[type])
    return ({
      kitchenAnaWeek,
      cusAnaWeek
    }
    )
}

export default useAnalytics