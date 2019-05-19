import React from 'react';
import { NavigationBar } from '../components/Navbar';
import background1 from '../img/background-1.png';
import rawatjalan from '../img/rawat_jalan.png';
import rawatinap from '../img/rawat_inap.png';
import {HomeButtons} from '../components/HomeButtons';

export class Home extends React.Component {
	
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
		return (
			<div>
				<div>
                    <img className="background-1" src={background1} alt ="background1"></img>
                </div>
				<NavigationBar onClick={this.props.onClick}/>
				<div className="d-flex justify-content-center">
					<h2 className="font-title-1">Pilih jenis pasien</h2>
				</div>
				<div className="d-flex justify-content-center">
					<HomeButtons path={'/survei'} tipe={'Rawat Jalan'} img={rawatjalan}/>
					<HomeButtons path={'/survei'} tipe={'Rawat Inap'} img={rawatinap}/>
				</div>
				<br></br>
			</div>
		)
	}
}