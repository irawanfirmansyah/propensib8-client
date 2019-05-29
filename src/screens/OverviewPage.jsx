import React from 'react';
import { NavigationBar } from '../components/Navbar';
import background1 from '../img/background-1.png';
import {HomeButtons} from '../components/HomeButtons';
import units from '../img/units.png';
import folder from '../img/folder.png';


export class OverviewPage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			tipeSurvei: '',
		}
		this.handleClick = this.handleClick.bind(this);
	}

	async handleClick(event){
		let id = event.target.id;
		this.setState({
			tipeSurvei: id,
		});
	}

	render() {
		console.log(this.state.tipeSurvei)
		return (
			<div>
				<div>
                    <img className="cover" src={background1} alt ="background1"></img>
                </div>
				<NavigationBar onClick={this.props.onClick} />
				<div className="d-flex justify-content-center">
					<h2 className="font-title-1">Pilih jenis pasien</h2>
				</div>
				<div className="d-flex justify-content-center">
					<HomeButtons path={'/overview/komplain'} tipe={'Komplain Pasien'} img={folder}/>
					<HomeButtons path={'/overview/unit'} tipe={'Performa Unit'} img={units}/>
				</div>
				<br></br>
			</div>
		)
	}
}