import { FormControl, Grid, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {TablePagination as TablePaginationMui} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

interface TablePaginationProps {
    gotoPage: (value: number) => void;
    setPageSize: (value: number) => void;
    pageIndex: number;
    pageSize: number;
    totalItems: number;
  }
  
 const TablePagination = ({ gotoPage, totalItems, setPageSize, pageSize, pageIndex }: TablePaginationProps) => {
    const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
      gotoPage(value - 1);
    };
  
    const handleChange = (event: SelectChangeEvent<number>) => {
      setPageSize(+event.target.value);
    };
  
    return (
      <Grid container alignItems="center" justifyContent="space-between" sx={{ width: 'auto', p:2 }}>
        <Grid item>
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" color="secondary">
                Row per page
              </Typography>
              <FormControl sx={{ m: 1 }}>
                <Select
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={pageSize}
                  onChange={handleChange}
                  size="small"
                  sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Typography variant="caption" color="secondary">
              Go to
            </Typography>
            <TextField
              size="small"
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) : 0;
                if(page > 0 && page <= Math.ceil(totalItems / pageSize)) {
                    gotoPage(page - 1);
                }
              }}
              sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1.25, width: 36 } }}
            />
          </Stack>
        </Grid>
        <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
          {/* <TablePaginationMui
            count={Math.ceil(rows.length / pageSize)}
            page={pageIndex + 1}
            onChange={()=> handleChangePagination}
            color="primary"
            variant="footer"
            // variant="combined"
            showFirstButton
            showLastButton
            component={"div"}
              onPageChange={()=>{console.log()}}
              rowsPerPage={25}
          /> */}
           <Pagination

          count={Math.ceil(totalItems / pageSize)}
          page={pageIndex + 1}
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
          showFirstButton
          showLastButton
        />
        </Grid>
      </Grid>
    );
  };
  export default TablePagination;