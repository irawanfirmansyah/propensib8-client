import React from 'react';

const $ = require('jquery')
$.DataTable = require('datatables.net')

export class TableContainer extends React.Component {
	componentDidMount() {
		$(this.el).DataTable({
			searching: false,
			info: false,
			responsive: true,
			paging: false
		})
	}

	render() {
		return (
			<div className="container data-tbl">
				<table className="display"  ref={el => this.el = el}>
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
			</div>
		)
	}
}