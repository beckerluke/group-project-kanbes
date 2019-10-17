import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';


class StorePage extends Component {
    render(){
        return(
            <KanbeTemplate>
                <p>This is the store page</p>

            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps) (StorePage);