import { Button, IconButton } from "@mui/material";
import { ReactNode } from "react";

interface IBubbleButton {
  children?: string;
  icon: ReactNode;
  onClick?: () => void;
}

const BubbleButton = ({ children, icon, onClick }: IBubbleButton) => {
  return (
    <>
      {children && (
        <Button
          startIcon={icon}
          onClick={onClick}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#333333",
            ":hover": { backgroundColor: "#414141" },
            border: "1px solid #606060",
            color: "#fff",
            gap: 1,
            width: "fit-content",
          }}
          size="small"
        >
          {children}
        </Button>
      )}
      {!children && (
        <IconButton
          size="small"
          sx={{
            backgroundColor: "#333333",
            ":hover": { backgroundColor: "#414141" },
            border: "1px solid #606060",
            color: "#fff",
          }}
        >
          {icon}
        </IconButton>
      )}
    </>
  );
};

export default BubbleButton;
