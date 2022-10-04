const styles = (theme) => ({
  chatContainer: {
    position: "absolute",
    top: "15%",
    alignContent: "center",
    flexDirection: "column",
  },
  fileWrapper: {
    width: "30%",
    border: "2px dashed darkblue",
    alignSelf: "center",
  },
  paperWrapper: {
    height: "40vw",
    width: "90%",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    padding: 8,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  tableWrap: {
    display: "flex",
    justifyContent: "center",
  },
});

export default styles;
