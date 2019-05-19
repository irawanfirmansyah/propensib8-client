import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabList from 'react-bootstrap/Tab'
import CustomTable from './Table';
import {CustomRow} from '../components/Row';

class CustomTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'review',
            listReview: [],
            listKomplain: []
        };
    }

    componentDidMount(){
        this.setState({
            listReview : this.props.listReview,
            listKomplain : this.props.listKomplain
        })
    }
    render() {
        console.log(this.state.listKomplain)
        console.log(this.state.listReview)
        return (
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
            >
                <Tab eventKey="review" title="Review">
                    <CustomTable header={['Pasien','Tanggal Isi','Review','Rating']}>
                        <CustomRow listReview={this.state.listReview}></CustomRow>
                    </CustomTable>
                </Tab>
                <Tab eventKey="komplain" title="Komplain">
                    <CustomTable header={['Pasien','Tanggal Isi','Komplain','Rating','Tindakan']}>
                        <CustomRow listKomplain={this.state.listKomplain}></CustomRow>
                    </CustomTable>
                </Tab>
            </Tabs>
        )
    }
}

export default CustomTabs;