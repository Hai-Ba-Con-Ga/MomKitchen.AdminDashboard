import { Kitchen, KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import KitchenApi from "../service/kitchen.api";
import UserApi from "../service/user.api";

const useKitchenData = () => {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [kitchenDishPagination, setKitchenDishPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 25,
    });
  const [kitchenTrayPagination, setKitchenTrayPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 25,
    });
  const [kitchenMealPagination, setKitchenMealPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 25,
    });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [id, setId] = useState<string>();
  const [idGetDish, setIdGetDish] = useState<string>();
  const [ownerId, setOwnerId] = useState<string>();

  const fetchKitchenDataFunction = async () => {
    try {
      const response = await KitchenApi.getKitchens({
        paging: pagination, // Pass the pagination state
        sort: sortState, // Pass the sort state
        keyword, // Pass the keyword
      });
      console.log(response);

      setTotalRows(response?.totalCount ?? 0);
      // Return the data from the response
      return response?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  // TODO: use debounce technique to prevent many calls at a short time
  const queryKey = ["kitchens", pagination, sortState, keyword];

  const { data: kitchenData, refetch: refreshKitchenData } = useQuery(
    queryKey,
    fetchKitchenDataFunction,
    {
      onError: (err) => console.log("error at hook", err),
    }
  );

  const updateKitchenFunction = async (kitchen: KitchenAdmin) => {
    const response = await KitchenApi.updateKitchen(kitchen);

    return response?.data;
  };
  const updateKitchen = useMutation(updateKitchenFunction, {});

  const deleteKitchenFunction = async (id: string) => {
    const response = await KitchenApi.deleteKitchen(id);

    return response?.data;
  };
  const deleteKitchen = useMutation(deleteKitchenFunction, {});

  const createKitchenFunction = async (kitchen: Kitchen) => {
    const response = await KitchenApi.createKitchen(kitchen);

    return response?.data;
  };

  const getKitchenDetailFunction = async () => {
    const response = await KitchenApi.getKitchenDetail(id);
    return response.data;
  };

  const { data: kitchenDetail, isLoading: isLoadingDetail } = useQuery(
    ["KitchenDetail", id],
    getKitchenDetailFunction,
    {}
  );

  const getKitchenDishesFunction = async () => {
    const response = await KitchenApi.getKitchenDish(idGetDish, {
      paging: kitchenDishPagination,
    });
    return response.data;
  };
  const {
    data: kitchenDish,
    isLoading: isLoadingKitchenDish,
    refetch: refreshKitchenDishData,
  } = useQuery(
    ["KitchenDishes", idGetDish, kitchenDishPagination],
    getKitchenDishesFunction,
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (idGetDish) {
      refreshKitchenDishData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idGetDish]);

  const getKitchenTraysFunction = async () => {
    const response = await KitchenApi.getKitchenTray(id, {
      paging: kitchenTrayPagination,
    });
    return response.data;
  };
  const {
    data: kitchenTray,
    isLoading: isLoadingKitchenTray,
    refetch: refreshKitchenTray,
  } = useQuery(
    ["KitchenTrays", id, kitchenTrayPagination],
    getKitchenTraysFunction,
    { enabled: false }
  );
  const getKitchenMealsFunction = async () => {
    const response = await KitchenApi.getKitchenMeal(id, {
      paging: kitchenMealPagination,
    });
    return response.data;
  };
  const {
    data: kitchenMeal,
    isLoading: isLoadingKitchenMeal,
    refetch: refreshKitchenMeal,
  } = useQuery(
    ["KitchenMeals", id, kitchenMealPagination],
    getKitchenMealsFunction,
    { enabled: true }
  );

  const getOwnerDetailFunction = async () => {
    const response = await UserApi.getUserDetail(ownerId);
    return response?.data?.data;
  };

  const { data: ownerDetail } = useQuery(
    ["KitchenDetail", ownerId],
    getOwnerDetailFunction,
    {}
  );
  return {
    kitchenData,
    setSortState,
    setKeyword,
    setPagination,
    updateKitchen,
    deleteKitchen,
    kitchenDetail,
    id,
    setId,
    totalRows,
    refreshKitchenData,
    ownerDetail,
    setOwnerId,
    detailState: {
      isLoadingDetail,
    },
    setIdGetDish,
    keyword,
    kitchenDish,
    kitchenMeal,
    kitchenTray,
    setKitchenDishPagination,
    setKitchenMealPagination,
    setKitchenTrayPagination,
    isLoadingKitchenDish,
    isLoadingKitchenMeal,
    isLoadingKitchenTray,
    refreshKitchenDishData,
    refreshKitchenTray,
    refreshKitchenMeal,
    createKitchenFunction,
  };
};

export default useKitchenData;
