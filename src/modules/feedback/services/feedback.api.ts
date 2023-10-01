import axiosClient from "@/base/service/axiosClient";
import { ResponseObject } from "@/base/service/response";
import { Feedback } from "@/types/@mk/entity/feedback";
import { PaginationState, SortingState } from "@tanstack/react-table";

interface FeedbackGetParams {
    paging?: PaginationState;
    sort?: SortingState;
    keyword?: string;
    // filter :
  }
const FeedbackApi = {
     getFeedbacks: (params: FeedbackGetParams) => {
    const endpoint = "/feedbacks";
    return axiosClient.get<ResponseObject<Feedback[]>>(endpoint, {
      params: { ...params },
    });
  },
  getFeedbackDetail: (id: number) => {
    const endpoint = "/feedback";
    return axiosClient.get<ResponseObject<Feedback>>(endpoint, {
      params: {
        id,
      },
    });
  },
  updateFeedback: (feedback: Feedback) => {
    const endpoint = "/feedback";
    return axiosClient.put(endpoint, feedback);
  },
  deleteFeedback: (id: number) => {
    const endpoint = "/feedback";
    return axiosClient.delete(endpoint, {
      params: { id },
    });
  },
}

export default FeedbackApi
