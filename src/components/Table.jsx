import React from 'react';

const $ = require('jquery')
$.DataTable = require('datatables.net')

class CustomTable extends React.Component {

    componentDidMount() {
        $(this.table).DataTable({
            searching: false,
            responsive: true,
            lengthChange: false,
        })
    }

    render() {
        return (
            <table className="display" ref={table => this.table = table}>
                <thead>
                    <tr>
                        {this.props.header.map((head, idx) => {
                            return (
                                <th key={idx}>{head}</th>
                            )
                        })}
                    </tr>
                </thead>
                {this.props.children}
            </table>
        )
    }
}

export default CustomTable;