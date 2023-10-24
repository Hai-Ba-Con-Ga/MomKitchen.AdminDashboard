
import { KitchenAdmin } from '@/types/@mk/entity/kitchen';
import { KitchenStatus } from '@/types/@mk/enum/kitchenStatus';
import { CloseOutlined, EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Delete } from '@mui/icons-material';
import { Chip, Tooltip, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import { createColumnHelper } from '@tanstack/react-table';
import Avatar from '@ui/@extended/Avatar';
import IconButton from '@ui/@extended/IconButton';
import { IndeterminateCheckbox } from '@ui/third-party/ReactTable';
import { MouseEvent, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';

type Props = {
    handleEditClick?: (kitchen: KitchenAdmin) => void;
    handleDeleteClick?: (id: string) => void;
}

const useKitchenTable = (props: Props) => {
  
    const { handleEditClick, handleDeleteClick } = props;
    const theme = useTheme();
    const columnHelper = createColumnHelper<KitchenAdmin>();
    // const [orderDetail, setOrderDetail] = useState(null);
    const nav = useNavigate();
    const columns = useMemo(
      () => {
        const cols = [
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columnHelper.accessor<any,any>("selection", {
            header: ({
              table: {
                getIsAllRowsSelected,
                getIsSomeRowsSelected,
                getToggleAllRowsSelectedHandler,
              },
            }) => (
              <IndeterminateCheckbox
                {...{
                  checked: getIsAllRowsSelected(),
                  indeterminate: getIsSomeRowsSelected(),
                  onChange: getToggleAllRowsSelectedHandler(),
                }}
              />
            ),
            cell: ({ row }) => (
              <IndeterminateCheckbox
                indeterminate={false}
                checked={row.getIsSelected()}
              />
            ),
            enableSorting: false,
            size: 50
          }),
          columnHelper.accessor("no", {
            header: "#",
            cell: ({row})=>{
              return  <Typography  color="CaptionText" sx={{
               whiteSpace: 'nowrap',
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               }}>
               KIT-{row.original.no}
             </Typography>
             },
             meta: {
              align: "left"
             }
          }),
          columnHelper.accessor("name", {
            header: "Kitchen Name",
            cell: ({row})=>{
             return  <Typography  color="CaptionText" sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              }}>
              {row.original.name}
            </Typography>
            },
            meta: {
              align: "left"
            }
          }),
          columnHelper.accessor("owner", {
            header: "Owner",
            cell: ({ row }) => {
              return (
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    alt="Avatar 1"
                    size="sm"
                    src={row.original.owner?.avatarUrl}
                  />
                  <Stack spacing={0}>
                    <Typography variant="subtitle1">
                      {row.original.owner?.fullName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {row.original.owner?.email}
                    </Typography>
                  </Stack>
                </Stack>
              );
            },
            enableSorting: false,
            meta: {
              align: "left"
            }
          }),
          columnHelper.accessor("address", {
            header: "Address",
            enableSorting: false,
            cell: ({ renderValue }) => (
              <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                }}
                fontWeight="500"
                textAlign={"left"}
               >
                {renderValue()}
              </Typography>
            ),
            meta: {
              align: "left"
            }
          }),
          columnHelper.accessor("area.name", {
            header: "Area",
            cell: ({ renderValue }) => (
              <Typography
                fontWeight="500"
                textAlign={"left"}
                variant="subtitle1">
                {renderValue()}
              </Typography>
            ),
            meta: {
              align: "left"
            }
          }),
          columnHelper.accessor("noOfDish", {
            header: "No of dishes",
            cell: ({ renderValue }) => (
              <NumberFormat
                style={{
                  display: "block",
                  textAlign : "right"
                }}
                displayType="text"
                prefix=""
                defaultValue={renderValue()}
              />
            ),
            meta: {
              align: "right"
            }
          }),
          columnHelper.accessor("noOfTray", {
            header: "No of trays",
            cell: ({ renderValue }) => (
              <NumberFormat
              style={{
                display: "block",
                textAlign : "right"
              }}
                displayType="text"

                defaultValue={renderValue()}
              />
            ),
          }),
          columnHelper.accessor("noOfMeal", {
            header: "No of meals",
            cell: ({ renderValue }) => (
              <NumberFormat
              style={{
                display: "block",
                textAlign : "right"
              }}
                displayType="text"
                defaultValue={renderValue()}
              />
            ),
          }),
          columnHelper.accessor("status", {
            header: "Status",
            cell: ({ renderValue }) => {
              // TODO: order status migrate
              switch (renderValue()) {
                case KitchenStatus.ACTIVE:
                  return (
                    <Chip
                      color="success"
                      label="ACTIVE"
                      size="small"
                      variant="filled"
                    />
                  );
                case  KitchenStatus.INACTIVE:
                  return (
                    <Chip
                      color="error"
                      label="INACTIVE"
                      size="small"
                      variant="filled"
                    />
                  );
                default:
                  return (
                    <Chip
                      color="error"
                      label="INACTIVE"
                      size="small"
                      variant="filled"
                    />
                  );
              }
            },
          }),
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columnHelper.accessor<any, any>("action", {
            header: "Actions",
            enableSorting: false,
            cell: ({ row }) => {
              const collapseIcon = row.getIsExpanded() ? (
                <CloseOutlined
                  rev={{}}
                  style={{ color: theme.palette.error.main }}
                />
              ) : (
                <EyeTwoTone
                  rev={{}}
                  twoToneColor={theme.palette.secondary.main}
                />
              );
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={0}>
                  <Tooltip title="View">
                    <IconButton
                      color="secondary"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        // row.toggleExpanded();
                        nav(`/kitchen/${row.original.id}`)
                      }}>
                      {collapseIcon}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        handleEditClick(row.original);
                      }}>
                      <EditTwoTone rev={{}} color={theme.palette.primary.main} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        handleDeleteClick(row.original.id);
                      }}>
                      <Delete color={theme.palette.error.main}  />
                    </IconButton>
                  </Tooltip>
                </Stack>
              );
            },
          }),
        ];
        return cols;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [theme]
    );
  
  
    return {
      columnsDef: columns,
    };
  
}

export default useKitchenTable