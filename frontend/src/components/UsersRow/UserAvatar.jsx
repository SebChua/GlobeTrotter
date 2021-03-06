import React from "react";
import { Avatar, Tooltip, Badge } from "@material-ui/core";
import { Close } from "@material-ui/icons";

export class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: true
        }
    }

    toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    }

    getInitials(name) {
		let names = name.split(" ");
		let firstInitial = names[0].charAt(0);
		let lastInitial = names[names.length - 1].charAt(0);
		return firstInitial + lastInitial;
    }
    
    getPermissionText(permissionCode) {
        switch (permissionCode) {
            case 0:
                return "Owner";
            case 1:
                return "Admin";
            case 2:
                return "Editor";
            case 3:
                return "Viewer";
            default:
                return "None";
        }
    }

    currentUserCanRemove(currentUser) {
        // Only Owner and Admin can delete other users from a trip
        return currentUser.permission === 0 || currentUser.permission === 1;
    }

    isBadgeInvisible(currentUser, user) {
        return !this.currentUserCanRemove(currentUser) || 
               user.permission === 0 || 
               user.permission === 1 || 
               this.state.hover;
    }

    render() {
        const { user, currentUser, color, handleRemove } = this.props;

        return (
            <Tooltip title={`${user.displayname} (${this.getPermissionText(user.permission)})`}>
                <div onMouseEnter={this.toggleHover}
                     onMouseLeave={this.toggleHover}>
                    {/* Owner cannot delete himself from the trip */}
                    <Badge badgeContent={<Close style={{fontSize: "10px"}}/>} color="secondary" 
                        onClick={this.isBadgeInvisible(currentUser, user) ? () => {} : () => handleRemove(user.email)}
                        invisible={this.isBadgeInvisible(currentUser, user)}>
                        <Avatar style={{backgroundColor: color}}>
                            {this.getInitials(user.displayname)}
                        </Avatar>
                    </Badge>
                </div>
            </Tooltip>
        );
    }
}