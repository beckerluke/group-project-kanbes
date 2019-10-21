import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import {
    createStyles,
    withStyles,
    Grid
} from "@material-ui/core";
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router';
import pink from '@material-ui/core/colors/pink';
import './Nav.Driver.css'




const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        selected: {
            backgroundColor: "turquoise !important",
            color: "white",
            fontWeight: 600
          }
    });

class NavDriver extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' })
    }

    state = {
        expand: false,
        selected: null

    }

    handleToggle = () => {
        this.setState({ expand: !this.state.expand })
    }

    updatedSelected = (selectedIndex) => {
        this.setState({selected: selectedIndex})
    }


    moveToDriverPage = (id) => {
        this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: id })
        this.props.history.push(`/driver/${id}`);
    }


    render() {
        const storesArray = this.props.store.activeStores
        

        let storeNavData = storesArray.map((item, index) => {
            
            //Breaks down the store address on the navigation bar
            let address = item.address;
            address = address.split(",");
            address = address[0];
            
            return (
                

                <ListItem key={index} button  onClick={() => this.moveToDriverPage(item.id)}  className={this.props.classes.nested}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ListItemText primary={item.store_name} secondary={address} />
                        </Grid>
                    </Grid>
                </ListItem>

            )
        })

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={this.props.classes.root}
            >
                <ListItem button onClick={this.handleToggle}>
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delivery" />
                    {this.state.expand ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {storeNavData}
                    </List>
                </Collapse>
            </List>

        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(withRouter(NavDriver)));
