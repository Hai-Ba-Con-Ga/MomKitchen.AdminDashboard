import { mockOrderPayments } from '@/data/@mk/mock/Payment';
import { OrderPaymentAdmin } from '@/types/@mk/entity/orderPayment';
import { DatePicker } from '@mui/x-date-pickers';
import MainCard from '@ui/MainCard';
import QuickTable from '@ui/common/table/QuickTable';
import { useMemo } from 'react';
import useOrderPaymentData from '../hooks/useOrderPaymentData';
import useOrderPaymentTable from '../hooks/useOrderPaymentTable';



const PaymentListPage = () => {
    const data = useMemo(()=>{
        return mockOrderPayments;
    },[])
    const {columnsDef} = useOrderPaymentTable({
        handleEditClick: ()=>console.log("TODO: implement")
        
    });
    const {setPagination,setSortState,setKeyword} = useOrderPaymentData()
  return (
    <MainCard content={false}>
    
    <QuickTable<OrderPaymentAdmin>
      columns={columnsDef}
      data={data}
      onPaginationChange={(pagination) => {
        setPagination(pagination);
      }}
      onRowSelectedChange={(rows) => console.log(rows)}
      addButton={{
        isShown: true,
        addButtonHandler: () => {
          // TODO : add action, nav page -> create/update
        },
        buttonContentLangKey: "Add order",
      }}
      onSearchKeywordChange={(q) => setKeyword(q)}
      onSortByChange={(sort) => setSortState(sort)}
      actionComponents={
        <>
          <DatePicker
            // value={value}
            onChange={(val) => {
              console.log(typeof val);
            }}
          />
          <DatePicker
            // value={value}
            onChange={(val) => {
              console.log(typeof val);
            }}
          />
        </>
      }
    />
  </MainCard>
  )
}

export default PaymentListPage