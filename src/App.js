import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import Form from './Form'

const App = () => {
	const [data, setData] = useState([])


	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://sun-app-39f83-default-rtdb.firebaseio.com/data.json')
			if (!response.ok) {
				throw new Error('Something went wrong!')
			}
			const responseData = await response.json()
			const loadedData = []
			for (const key in responseData) {
				loadedData.push({
					id: key,
					date: responseData[key].date,
					value: responseData[key].value,
				})
			}
			setData(loadedData)
		}
		fetchData().catch(error => {

		})
	}, )

	const addData = async (id, date, value) => {
		await fetch('https://sun-app-39f83-default-rtdb.firebaseio.com/data.json', {
			method: 'POST',
			body: JSON.stringify({
				id: id,
				date: date,
				value: value,
			}),
		})
		setData(prevData => {
			const updatedData = [...prevData]
			updatedData.push({ id: id, date: date, value: value })
			return updatedData
		})
	}

	return (
		<div>
			<LineChart data={data} />
			<Form addData={addData} />
		</div>
	)
}

export default App
