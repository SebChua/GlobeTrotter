import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Paper
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { styles } from "./styles";
import APIClient from "../../../api/apiClient.js";
import { UserContext } from "../../../UserContext";

class PureAddUserModal extends React.Component {
  constructor(props) {
    super(props);
    const emptyData = { data: "" };
    this.state = {
      formData: {
        email: emptyData
      },
      success: true
    };
    this.formConfig = {
      email: { label: "Email", type: "email", autoComplete: "email" }
    };
  }

  handleInputChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: {
          ...formData[e.target.name],
          data: e.target.value
        }
      },
      success: true
    });
  };

  handleSubmit = (e, formData, isUserOnTrip, onSubmit, onClose) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(formData);
    console.log(formData.email);
    console.log(this.context.user.token);
    
    this.apiClient = new APIClient();
    this.apiClient
      .getUser(formData.email.data, this.context.user.token)
      .then(response => {
        if (!response.exist) {
          this.setState({
            formData: {
              ...formData,
              email: {
                ...formData.email,
                error: "User does not exist."
              }
            }
          });
        } else {
          // Make sure that user is not already on the trip
          if (isUserOnTrip(formData.email.data)) {
            this.setState({
              formData: {
                ...formData,
                email: {
                  ...formData.email,
                  error: "User is already added on this trip."
                }
              }
            });
          } else {
            this.setState({
              formData: {
                ...formData,
                email: {
                  ...formData.email,
                  error: undefined
                }
              }
            });
  
            onSubmit({
              email: formData.email.data,
              displayname: response.displayname
            });
  
            onClose();
          }
        }
      })
  };

  render() {
    const { classes, isUserOnTrip, onClose, onSubmit } = this.props;
    const { formData } = this.state;
    const { formConfig } = this;
    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose} />
        <form onSubmit={e => this.handleSubmit(e, formData, isUserOnTrip, onSubmit, onClose)}>
          <Paper className={classes.modal}>
            <Typography variant="h5" className={classes.title}>
              Add User to Trip
            </Typography>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            {Object.keys(formConfig).map((fieldName, i) => (
              <TextField
                required
                key={i}
                className={classes.textField}
                onChange={this.handleInputChange}
                name={fieldName}
                error={formData[fieldName].error !== undefined}
                helperText={formData[fieldName].error}
                inputRef={formConfig[fieldName].ref}
                onBlur={formConfig[fieldName].onBlur}
                label={formConfig[fieldName].label}
                type={formConfig[fieldName].type}
                autoComplete={formConfig[fieldName].autoComplete}
              />
            ))}
            {!this.state.success && (
              <div>
                <Typography variant="caption" color="error">
                  Invalid email/password combination.
                </Typography>
              </div>
            )}
            <Button
              type="submit"
              className={classes.loginButton}
              color="primary"
              variant="contained"
            >
              <Typography className={classes.loginText} variant="button">
                Add User
              </Typography>
            </Button>
          </Paper>
        </form>
      </React.Fragment>
    );
  }
}

PureAddUserModal.contextType = UserContext;

export const AddUserModal = withStyles(styles)(PureAddUserModal);
