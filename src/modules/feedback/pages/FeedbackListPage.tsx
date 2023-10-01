import { mockFeedbacks } from '@/data/@mk/mock/Feedback';
import { Feedback } from '@/types/@mk/entity/feedback';
import { DatePicker } from '@mui/x-date-pickers';
import MainCard from '@ui/MainCard';
import QuickTable from '@ui/common/table/QuickTable';
import { useMemo } from 'react';
import useFeedbackData from '../hooks/useFeedbackData';
import useFeedbackTable from '../hooks/useFeedbackTable';


const FeedbackListPage = () => {
    const data = useMemo(()=>{
        return mockFeedbacks;
    },[])
    const {columnsDef} = useFeedbackTable({
        handleEditClick: ()=>console.log("TODO: implement")
        
    });
    const {setPagination,setSortState,setKeyword} = useFeedbackData()
  return (
    <MainCard content={false}>
    
    <QuickTable<Feedback>
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

export default FeedbackListPage