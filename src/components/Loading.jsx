import React from 'react';
import spinner from '../Spinner-1s.svg';
import '../App.css';

export const Loading = (props) => {

	return (
		<div style={{ backgroundColor: 'white' }}>
			<br></br>
			<img src={spinner} className="App-logo" alt="logo" />
			<div className="text-center loading">{props.msg}</div>
		</div>
	)
}

Loading.defaultProps = {
	msg: "Loading..."
}