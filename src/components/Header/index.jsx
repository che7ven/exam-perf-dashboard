import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  IconButton,
  Popover,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { getOrigin } from "../../utils/constants";
import styles from "./styles";

const Header = ({ classes, user }) => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);

  const openUserProfile = (event) => {
    setUserProfile(event.currentTarget);
  };

  const closeUserProfile = () => {
    setUserProfile(null);
  };

  const userOpen = Boolean(userProfile);
  const userId = userOpen ? "user-detail" : undefined;

  const logout = () => {
    navigate("/", { state: "logOff" });
  };

  return (
    <header>
      <nav className={classes.nav}>
        <Typography variant="h5" style={{ paddingLeft: 8 }}>
          Exam Dashboard
        </Typography>
        <div className={classes.optionHolder}>
          {user && (
            <IconButton
              onClick={openUserProfile}
              id={userId}
              aria-label="profile"
              data-testid={"profile"}
            >
              <div className={classes.userName}>
                {user && user?.charAt(0)?.toUpperCase()}
              </div>
            </IconButton>
          )}
          <Popover
            id={userId}
            open={userOpen}
            anchorEl={userProfile}
            onClose={closeUserProfile}
            anchorOrigin={getOrigin("bottom", "left")}
            transformOrigin={getOrigin("top", "center")}
            data-testid={"profile-pop"}
          >
            <Card
              className={`${classes.typography} ${classes.center} ${classes.card}`}
              role="dialog"
            >
              <Button
                id="logout"
                className={classes.btnStyle}
                onClick={logout}
                data-testid={"logout"}
              >
                LOGOUT
              </Button>
            </Card>
          </Popover>
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  classes: {},
  type: "",
};

Header.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.string,
};

export default withStyles(styles)(Header);
