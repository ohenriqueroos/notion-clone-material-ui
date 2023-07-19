import { Button, Stack, Typography } from "@mui/material";

interface IFloatingButtonProps {
  title: string;
  description: string;
  onClick: () => void;
  image: any;
  alt: string;
}

const FloatingButton = ({
  title,
  description,
  onClick,
  image,
  alt,
}: IFloatingButtonProps) => {
  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "start",
        ":hover": { backgroundColor: "#414141" },
        color: "#fff",
        gap: 1,
        width: 350,
      }}
      size="small"
      variant="text"
      onClick={onClick}
    >
      {image}
      <Stack direction="column" alignItems={"start"}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{description}</Typography>
      </Stack>
    </Button>
  );
};

export default FloatingButton;
