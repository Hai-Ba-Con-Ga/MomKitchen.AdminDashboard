import { QueryClient, QueryClientConfig } from "react-query";

const queryClientConf: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // onError: queryErrorHandler,
      staleTime: 0, // 10 minutes
      cacheTime: 0, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
      // retry: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      useErrorBoundary: true,
      // suspense = true. it will has problem with option enabled.
      // https://tanstack.com/query/v4/docs/guides/suspense. It said:
      // NOTE: Suspense mode for React Query is experimental, same as Suspense for data fetching itself. These APIs WILL change and should not be used in production unless you lock both your React and React Query versions to patch-level versions that are compatible with each other
      suspense: false,
    },
    mutations: {
      // onError: queryErrorHandler
      useErrorBoundary: true,
    },
  },
};

const queryClient = new QueryClient(queryClientConf);

export default queryClient;
