import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class InvoiceTable extends Component {
   

    render() {
        
        let totalCounter = 0;

        const tableData = this.props.tableDataToRender
        let tableToRender;
        
        if(this.props.tableDataToRender.length > 0){
            tableToRender = tableData.map((item, index) => {
                const rowTotal = Number.parseFloat(
                                    item.sold_product_count 
                                    * item.unit_sale_price).toFixed(2);
                totalCounter += parseFloat(rowTotal);
                

                return(
                    <tr key={index}>
                        <td>{item.sold_product_count}</td>
                        <td>{item.product_name}</td>
                        <td className="money-column">
                            {item.unit_sale_price}
                        </td>
                        <td className="money-column">
                            {rowTotal}
                            
                        </td>
                    </tr>
                )
            })
        }

        totalCounter = Number.parseFloat(totalCounter).toFixed(2);
        const storeKeepsThirtyPercent = Number.parseFloat(totalCounter * .3).toFixed(2);
        const kanbesDueSeventyPercent = Number.parseFloat(totalCounter * .7).toFixed(2);

        return (
            <div>
                
                <table className="invoice-table">
                    <thead>
                        <tr>
                        <th>Qty</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableToRender}
                    </tbody>
                </table>
                
                <div className="totals-box">
                    Total Sales: {totalCounter}
                    <br/>
                    Store: {storeKeepsThirtyPercent}
                    <br/>
                    Kanbe's Due: {kanbesDueSeventyPercent}
                </div>

                
            </div>
        );
    }
}

export default connect(mapStoreToProps)(InvoiceTable);