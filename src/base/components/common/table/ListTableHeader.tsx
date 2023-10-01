import { GlobalFilter } from "@/base/utils/react-table";
import { PlusOutlined } from "@ant-design/icons";
import { FilterList } from "@mui/icons-material";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { isEmpty } from "lodash";
import { Dispatch, MouseEventHandler, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  search?: {
    keyword: string;
    setKeyword: Dispatch<string>;
  };
  additionButton?: {
    isShown: boolean;
    handleAdd: MouseEventHandler;
    addButtonContentKey: string;
  };
  filter?: {
    isShow: boolean;
    isExpandFilterMenu: boolean;
    setIsExpandFilterMenu: Dispatch<boolean>;
  };
  actionComponents?: ReactNode
}

const ListTableHeader = (props: Props) => {
  const { search, additionButton = { isShown: false }, filter, actionComponents } = props;
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();
  return (
    <Stack
      direction={matchDownSM ? "column" : "row"}
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 1.5 }}>
      <Stack
        direction={matchDownSM ? "column" : "row"}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 3 }}>
        {!isEmpty(search) && (
          <GlobalFilter
            globalFilter={search.keyword}
            setGlobalFilter={search.setKeyword}
            size="small"
          />
        )}
        {!isEmpty(filter) && (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              filter.setIsExpandFilterMenu(!filter.isExpandFilterMenu);
            }}
            sx={{ mt: 0.25 }}>
            <FilterList />
          </IconButton>
        )}
      </Stack>
      <Stack
        direction={matchDownSM ? "column" : "row"}
        alignItems="center"
        spacing={1}>
        {/* <SortingSelect
              sortBy={sortBy.id}
              setSortBy={setSortBy}
              allColumns={allColumns}
            /> */}
            {actionComponents}
        {additionButton.isShown && (
          <Button
            variant="shadow"
            startIcon={<PlusOutlined rev={{}} />}
            onClick={additionButton.handleAdd}>
            {t(additionButton.addButtonContentKey)}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ListTableHeader;
