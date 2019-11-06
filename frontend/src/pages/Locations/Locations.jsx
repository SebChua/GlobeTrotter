import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Fab, Typography } from "@material-ui/core";
import { Add, Close, DoubleArrow } from "@material-ui/icons";

import { LocationCard, LocationListWindow } from "../../components";
import { styles } from "./styles";
import Grid from '@material-ui/core/Grid';
import MapContainer from "../../components/MapContainer/MapContainer";
import bondi from "../../assets/bondi.jpg";
import manly from "../../assets/manly.jpg";
import unsw from "../../assets/unsw.jpeg";
import coogee from "../../assets/coogee.jpeg";
import darling from "../../assets/darling.jpeg";
import opera from "../../assets/opera.jpeg";
import history from "../../history.js";

const locations = [
  {
    title: "Bondi Beach",
    type: "Beaches, Family",
    duration: "Recommended duration: 2 hours",
    media: bondi,
    description:
      "The sweeping white-sand crescent of Bondi is one of Australia’s most iconic beaches. Reliable waves draw surfers while, nearby, hardy locals swim in the Icebergs ocean pool year-round. Trendy, health-conscious Sydneysiders head to laid-back cafes around Hall Street, while hip backpackers frequent the area's casual pubs. Walkers and joggers use the clifftop Bondi to Coogee Coastal Walk, with its dramatic scenery.",
    lat: -33.8915,
    lng: 151.2767
  },
  {
    title: "Manly Beach",
    type: "Beaches, Family",
    duration: "Recommended duration: 2 hours",
    media: manly,
    description:
      "Manly Beach is a beach situated among the Northern Beaches of Sydney, Australia in Manly, New South Wales. From north to south, the three main sections are Queenscliff, North Steyne, and South Steyne.",
    lat: -33.7932,
    lng: 151.2876
  },
  {
    title: "Coogee Beach",
    type: "Beaches, Family",
    duration: "Recommended duration: 2 hours",
    media: coogee,
    description:
      "The sweeping white-sand crescent of Bondi is one of Australia’s most iconic beaches. Reliable waves draw surfers while, nearby, hardy locals swim in the Icebergs ocean pool year-round. Trendy, health-conscious Sydneysiders head to laid-back cafes around Hall Street, while hip backpackers frequent the area's casual pubs. Walkers and joggers use the clifftop Bondi to Coogee Coastal Walk, with its dramatic scenery.",
    lat: -33.9203,
    lng: 151.2581
  },
  {
    title: "Sydney Opera House",
    type: "Performances, Family",
    duration: "Recommended duration: 2 hours",
    media: opera,
    description:
      "Manly Beach is a beach situated among the Northern Beaches of Sydney, Australia in Manly, New South Wales. From north to south, the three main sections are Queenscliff, North Steyne, and South Steyne.",
    lat: -33.8568,
    lng: 151.2153
  },
  {
    title: "Darling Square",
    type: "Mall",
    duration: "Recommended duration: 2 hours",
    media: darling,
    description:
      "The sweeping white-sand crescent of Bondi is one of Australia’s most iconic beaches. Reliable waves draw surfers while, nearby, hardy locals swim in the Icebergs ocean pool year-round. Trendy, health-conscious Sydneysiders head to laid-back cafes around Hall Street, while hip backpackers frequent the area's casual pubs. Walkers and joggers use the clifftop Bondi to Coogee Coastal Walk, with its dramatic scenery.",
    lat: -33.8780,
    lng: 151.2018
  },
  {
    title: "UNSW",
    type: "Education",
    duration: "Recommended duration: 2 hours",
    media: unsw,
    description:
      "Manly Beach is a beach situated among the Northern Beaches of Sydney, Australia in Manly, New South Wales. From north to south, the three main sections are Queenscliff, North Steyne, and South Steyne.",
    lat: -33.9173,
    lng: 151.2313
  }
];

export class PureLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenListWindow: false,
      addedLocations: []
    };
  }

  handleAddLocation = key => {
    this.setState(state => {
      const addedLocations = state.addedLocations.concat(key);
      return {
        ...state,
        addedLocations
      };
    });
  };

  handleRemoveLocation = key => {
    this.setState(state => {
      const addedLocations = state.addedLocations.filter(
        (locationKey, i) => locationKey !== key
      );
      return {
        ...state,
        addedLocations
      };
    });
  };

  handleOpenListWindow = () => {
    this.setState({
      isOpenListWindow: !this.state.isOpenListWindow
    });
  };

  getAddedLocations = () => {
    return locations.filter(
      (value, key) => this.state.addedLocations.indexOf(key) !== -1
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.section}>
          <Grid container item xs={6} className={classes.flexScroll}>
            <Typography variant="h4" className={classes.title}>
              Recommended Locations
            </Typography>
            {locations.map((loc, key) => (
              <div key={key} className={classes.locationCardContainer}>
                {this.state.addedLocations.indexOf(key) !== -1 ? (
                  <Fab
                    color="primary"
                    onClick={() => {
                      this.handleRemoveLocation(key);
                    }}
                  >
                    <Close />
                  </Fab>
                ) : (
                  <Fab
                    color="primary"
                    onClick={() => {
                      this.handleAddLocation(key);
                    }}
                  >
                    <Add />
                  </Fab>
                )}
                <LocationCard
                  className={classes.card}
                  title={loc.title}
                  type={loc.type}
                  duration={loc.duration}
                  media={loc.media}
                  description={loc.description}
                />
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              className={
                this.state.isOpenListWindow
                  ? classes.arrowButtonOut
                  : classes.arrowButtonIn
              }
              onClick={this.handleOpenListWindow}
            >
            <DoubleArrow />
            </Button>
            <LocationListWindow
              isOpen={this.state.isOpenListWindow}
              locations={this.getAddedLocations()}
              onRemove={this.handleRemoveLocation}
            />
            <Button
              variant="contained"
              color="secondary"
              className={
                this.state.isOpenListWindow
                  ? classes.viewButtonOut
                  : classes.viewButtonIn
              }
            >
              View Plan
            </Button>  
          </Grid>
          <Grid container item xs={6}>
            <MapContainer
              locations={locations}
            />
          </Grid>
        </Grid>
      </div>  
    );
  }
}

export const Locations = withStyles(styles)(PureLocations);
