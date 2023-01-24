import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice.js";

import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Divider from '@mui/material/Divider';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function AuthMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const iconMunueStyle = { color: "rgba(113,113,113,255)" };
  const iconMunueItemStyle = {
    color: "rgba(113,113,113,255)",
    marginLeft: "3px",
  };

  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="btn"
        sx={{ border: 1, borderColor: "#dddddd", borderRadius: 50 }}
      >
        <MenuIcon style={iconMunueStyle} />
        <AccountCircleIcon style={iconMunueStyle} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {user ? (
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        onLogout();
                      }}
                    >
                      Logout
                      <LogoutIcon style={iconMunueItemStyle}/>
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link className="flex " to="/register">
                        Register
                        <PersonAddIcon style={iconMunueItemStyle} />
                      </Link>
                    </MenuItem>
                    <Divider/>
                    <MenuItem className="center" onClick={handleClose}>
                      <Link className="flex" to="/login">
                        Login
                        <LoginIcon style={iconMunueItemStyle} />
                      </Link>
                    </MenuItem>
                  </MenuList>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
