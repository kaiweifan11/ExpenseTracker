import React, { Component } from 'react';
import c3 from 'c3';
import 'c3/c3.css';
import './chart.css';

export default class Chart_Pie extends Component {
	constructor(props){
		super(props);
		this.state = {
			current_data: this.props.data,
		}
	}
	
	componentDidMount(){
		this.generateChart();
		window.addEventListener('resize', this.generateChart);
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.generateChart);
	}
	
	generateChart = () =>{
		let width = this.props.chart_width;
    	let height = this.props.chart_height;
    	
    	// Padding for the chart, we need padding so to show the axis labels
    	// https://c3js.org/samples/options_padding.html
    	let padding = {top: 0, right: 65, bottom: 0, left: 45}; // screen horizontal
		
    	let chart = c3.generate({
    		bindto: "#chart_"+this.props.id,
    		size: {
    			width: width,
    			height: height,
    		},
    		data: {
    	        columns: this.props.data,
    	        type: 'pie'
    	    },
    	    pie: {
    	        label: {
    	        	show: true
    	        }
    	    },
    	    title: {
    	        text: this.props.title,
    	        position: 'top-center',   // top-left, top-center and top-right
	        },
    	})
    	
    	return chart;
	}
	
	render(){
		let style = {};
		style = Object.assign(style, this.props.style);
		
		return(
			<div id={"chart_"+this.props.id} style={style}/>
		);
	}
}