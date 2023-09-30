import { mockDishes } from "@/data/@mk/mock/Dish";
import { mockOrder } from "@/data/@mk/mock/Order";
import { OrderAdmin } from "@/types/@mk/entity/order";
import { CloseOutlined, EyeTwoTone } from "@ant-design/icons";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import {
  Chip,
  Dialog,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { Row, createColumnHelper } from "@tanstack/react-table";
import Avatar from "@ui/@extended/Avatar";
import MainCard from "@ui/MainCard";
import QuickTable from "@ui/common/table/QuickTable";
import { IndeterminateCheckbox } from "@ui/third-party/ReactTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import OrderViewInline from "../../components/OrderViewInline";
import useOrderTable from "../../hook/useOrderTable";
import useSnackbar from "@/base/hooks/useSnackbar";
import Snackbar from "@ui/@extended/Snackbar";

const OrderListPage = () => {
  const data = useMemo(
    () =>
      mockOrder().map((order) => {
        order.meal?.tray?.dishies?.push(...mockDishes);
        return order;
      }),
    []
  );
  const { columnsDef, renderRowSubComponent } = useOrderTable({
    handleEditClick: (order) => {
      // TODO implement
    },
  });
  const { openSimpleErrorSnackbar } = useSnackbar();
  useEffect(() => {
    openSimpleErrorSnackbar("Hello snackbar");
  }, []);
  const [tabValue, setTabValue] = useState("all");
  return (
    <MainCard content={false}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          margin: "2rem 0 0 2rem",
        }}>
        <Tabs
          value={tabValue}
          onChange={(e, value) => {
            setTabValue(value);
          }}
          aria-label="basic tabs example">
          <Tab
            sx={{ fontWeight: 600 }}
            label={
              <Stack direction={"row"} gap={1}>
                <Typography>All</Typography>
                <Chip
                  color="primary"
                  label="UNPAID"
                  size="small"
                  variant="filled"
                />
              </Stack>
            }
            value={"all"}
          />
          <Tab sx={{ fontWeight: 600 }} label="Cancel" value="cancel" />
          <Tab sx={{ fontWeight: 600 }} label="Complete" value="complete" />
        </Tabs>
      </Box>
      <QuickTable
        columns={columnsDef}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        onPaginationChange={(pagination) => {
          console.log(pagination);
        }}
        onRowSelectedChange={(rows) => console.log(rows)}
        addButton={{
          isShown: true,
          addButtonHandler: () => {
            // TODO : add action, nav page -> create/update
          },
          buttonContentLangKey: "Add order",
        }}
        onSearchKeywordChange={(q) => console.log(q)}
        onSortByChange={(sort) => console.log(sort)}
      />
      <Snackbar />
    </MainCard>
  );
};

export default OrderListPage;
