import { Outlet } from "react-router-dom";
import SideMenu from "../components/Menu/SideMenu";
import { Stack } from "@mui/material";
import { useState } from "react";

const RootPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((oldValue) => !oldValue);
  };

  return (
    <Stack display={"flex"} direction={"row"} color={"#fff"}>
      <SideMenu isMenuOpen={isMenuOpen} toggleMenuHandler={toggleMenuHandler} />
      <main
        style={{
          backgroundColor: "#141414",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Outlet />
      </main>
    </Stack>
  );
};

export default RootPage;
