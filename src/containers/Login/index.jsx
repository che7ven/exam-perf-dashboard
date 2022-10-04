import React, { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Button } from "../../stories/Button";
import { UsersContext } from "../../utils/usersContext";
import styles from "./styles";

const Login = ({ classes }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UsersContext);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleName = (event) => {
    setUser(event.target.value);
  };

  const handleLogin = () => {
    if (user === "") {
      setError(true);
      setErrorMsg(error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Grid container className={classes.container}>
      <Header />
      <Grid item container className={classes.innerWrapper}>
        <Grid item>
          {error && user === "" && (
            <p className={classes.helperText} role="alert">
              Please enter username.
            </p>
          )}
          {errorMsg !== "" && (
            <p className={classes.helperText} role="alert">
              {errorMsg}
            </p>
          )}
        </Grid>
        <Grid item className={classes.inputWrap}>
          <Input
            value={user}
            label="User ID"
            type="outlined"
            handleChange={handleName}
            error={error && user === ""}
          />
        </Grid>
        <Grid item className={classes.buttonWrap}>
          <Button
            handleClick={handleLogin}
            label="Login"
            primary
            size="medium"
            style={{ pointer: "cursor" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.defaultProps = {
  classes: {},
};

Login.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(memo(Login));
