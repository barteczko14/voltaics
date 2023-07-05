import React, { useState } from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import classes from './LineChart.module.css'

const LineChart = props => {
	const data = {
		labels: props.data.map(data => data.date),
		datasets: [
			{
				label: 'Fotowoltaika',
				data: props.data.map(data => data.value),
				fill: false,
				backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#f0331a', '#f3ba2f', '#2a71d0'],
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	}

	return (
		<div className={classes.chart}>
			<Line data={data} />
		</div>
	)
}

export default LineChart
