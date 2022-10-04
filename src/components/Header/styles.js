const styles = (theme) => ({
  card: {
    minWidth: 93,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  hr: {
    width: "60%",
    margin: 10,
  },
  mainUser: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },
  nav: {
    top: 0,
    height: 60,
    minWidth: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    background: "#041F41",
    color: "azure",
    zIndex: 9999,
    boxShadow: "3px 5px 15px 3px #9a9898",
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
      height: 64,
    },
  },
  notifyIcon: {
    width: 24,
    height: 24,
  },
  optionHolder: {
    marginRight: 22,
    [theme.breakpoints.up("sm")]: {
      marginRight: 4,
    },
    [theme.breakpoints.up("md")]: {
      marginRight: 2,
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 18,
    },
  },
  subText: {
    fontSize: 12,
    color: "#0071ce",
  },
  userName: {
    background: "#d8d8d8",
    width: 24,
    height: 22,
    borderRadius: 16,
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      width: 32,
      height: 32,
    },
  },
  btnStyle: {
    width: "100%",
    height: 48,
    fontSize: 14,
    color: "#282828",
    textTransform: "none !important",
    justifyContent: "left",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
});

export default styles;
