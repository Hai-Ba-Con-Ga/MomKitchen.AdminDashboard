import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MainCard from "@ui/MainCard";

type KitchenCardProps = {
  data: KitchenAdmin;
  onClick: (data: KitchenAdmin) => void;
};

export const KitchenCard = (props: KitchenCardProps) => {
  const { data, onClick } = props;
  return (
    <MainCard onClick={() => onClick(data)}>
      <Stack gap={1}>
        <Typography variant="h5">{data?.name}</Typography>
        <Stack direction="row" gap={1}>
          <Typography variant="subtitle2" color="GrayText">
            {data?.address}
          </Typography>
          <Typography variant="subtitle2" color="GrayText">
            {data?.owner?.phone}
          </Typography>
          <Typography variant="subtitle2" color="GrayText">
            {data?.owner?.email}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
};

type CustomerCardProps = {
  data: CustomerAdmin;
  onClick: (data: CustomerAdmin) => void;
  selected?: boolean;
};

export const CustomerCard = (props: CustomerCardProps) => {
  const theme = useTheme();
  const { data, onClick, selected=false } = props;
  return (
    <MainCard
      sx={{
        cursor: "pointer",
        ...(selected ? {backgroundColor: theme.palette.primary.lighter}: {})
      }}
      hoverStyle={{
        backgroundColor: theme.palette.primary.lighter,
      }}
      onClick={() => onClick(data)}>
      <Stack gap={1}>
        <Typography variant="h5">{data?.fullName}</Typography>
        <Stack direction="row" gap={1}>
          <Typography variant="subtitle2" color="GrayText">
            {data?.phone}
          </Typography>
          {/* <Typography variant="subtitle2" color="GrayText">
              {data?.owner?.phone}
            </Typography> */}
          <Typography variant="subtitle2" color="GrayText">
            {data?.email}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
};
