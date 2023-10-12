import { Button, Icon } from "@mui/material";

const NavButton = ({ iconName, label }) => {
  return (
    <Button
      className="NavBarBtns"
      style={{
        fontSize: ".9em",
        fontWeight: "600",
        textTransform: "none",
        paddingRight: "5vw",
      }}
      startIcon={<Icon>{iconName}</Icon>}
    >
      {" "}
      {label}{" "}
    </Button>
  );
};

export default NavButton;
