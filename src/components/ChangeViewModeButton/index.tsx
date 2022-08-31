/** @jsxImportSource @emotion/react */
import GridView from "@mui/icons-material/GridView";
import { Button, Tooltip } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export interface ChangeViewModeButtonProps {
  handleChangeGrouping: () => void;
}

const ChangeViewModeButton: FC<ChangeViewModeButtonProps> = ({ handleChangeGrouping }) => {
  const [common] = useTranslation("common");

  return (
    <Tooltip title={common('cta.changeViewMode')} placement="top" arrow>
      <Button color="info" variant="contained" size="large" onClick={handleChangeGrouping}>
        <GridView />
      </Button>
    </Tooltip>
  );
};

export default ChangeViewModeButton;