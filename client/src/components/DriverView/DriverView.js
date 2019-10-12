import React, { Compenent } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';




class DriverView extends Component {
    constructor() {

        this.state = {
            formControls: {
                par: {
                    value: ''
                },
                lastPar: {
                    value: ''
                },
                sold: {
                    value: ''
                },
                shrink: {
                    value: ''
                },
                added: {
                    value: ''
                }
            }
        }

    }
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }


    render() {
        return (
            <div>
                <h1>{this.state.heading}</h2>
                <h2 id="welcome">
                    Welcome, {props.store.user.username}!
                </h2>
                <p>Your ID is: {props.store.user.id}</p>

                <form>
                    <input type="text"
                        name="par"
                        value={this.state.formControls.par.value}
                        onChange={this.changeHandler}
                    />

                    <input type="text"
                        name="last par"
                        value={this.state.formControls.lastPar.value}
                        onChange={this.changeHandler}
                    />

                    <input type="text"
                        name="sold"
                        value={this.state.formControls.sold.value}
                        onChange={this.changeHandler}
                    />

                    <input type="text"
                        name="shrink"
                        value={this.state.formControls.shrink.value}
                        onChange={this.changeHandler}
                    />

                    <input type="text"
                        name="added"
                        value={this.state.formControls.added.value}
                        onChange={this.changeHandler}
                    />
                </form>
            </div>
        );
    }
}




export default connect(mapStoreToProps)(DriverView);