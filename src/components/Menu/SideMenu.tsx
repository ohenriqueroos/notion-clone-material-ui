import { Grid, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

interface ISideMenuProps {
  isMenuOpen: boolean;
  toggleMenuHandler: () => void;
}

const activeStyle = {
  color: "#3e92a7",
  textDecoration: "none",
  display: "flex",
  gap: 10,
};

const inactiveStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  gap: 10,
};

const SideMenu = ({ isMenuOpen, toggleMenuHandler }: ISideMenuProps) => {
  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={isMenuOpen ? "start" : "center"}
      py={2}
      px={1}
      pl={isMenuOpen ? 4 : undefined}
      style={{
        backgroundColor: "#333333",
        color: "#fff",
        width: isMenuOpen ? "15%" : "4%",
        height: "90vh",
        position: "fixed",
        top: "5vh",
        borderRadius: "0px 10px 10px 0px",
        border: "1px solid #606060",
        borderLeft: "0px",
      }}
    >
      <Grid
        item
        container
        direction={"row"}
        justifyContent={isMenuOpen ? "end" : "start"}
        mb={2}
      >
        <IconButton onClick={toggleMenuHandler}>
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={isMenuOpen ? "start" : "center"}
      >
        <Grid item>
          <NavLink
            to="/"
            style={(status) => {
              return status.isActive ? activeStyle : inactiveStyle;
            }}
          >
            <HomeIcon />
            {isMenuOpen && <Typography variant="subtitle1">Home</Typography>}
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink
            to="/teste"
            style={(status) => {
              return status.isActive ? activeStyle : inactiveStyle;
            }}
          >
            <HomeIcon />
            {isMenuOpen && <Typography variant="subtitle1">Teste</Typography>}
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideMenu;
