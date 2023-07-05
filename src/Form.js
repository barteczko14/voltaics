import React, { useState, useEffect, useReducer } from 'react'
import './Form.css'
import Buttons from './Buttons'

const initialState = {
	isValid: false,
	lostEnergy: '',
	producedEnergy: '',
	date: '',
	totalEnergy: 0,
	text: '',
}

const reducerFn = (prevState, action) => {
	switch (action.type) {
		case 'COUNT_LOST_ENERGY':
			return {
				...prevState,
				lostEnergy: action.value,
			}
		case 'COUNT_PRODUCED_ENERGY':
			return {
				...prevState,
				producedEnergy: action.value,
			}
		case 'COUNT_DATE':
			return {
				...prevState,
				date: action.value,
			}
		case 'TOTAL_ENERGY': {
			const energyAmount = (prevState.producedEnergy * 0.8 - prevState.lostEnergy).toFixed(2)
			return {
				...prevState,
				totalEnergy: energyAmount,
			}
		}
		case 'VALID': {
			if (
				prevState.lostEnergy.trim().length > 0 &&
				!isNaN(prevState.lostEnergy) &&
				!isNaN(prevState.producedEnergy) &&
				prevState.producedEnergy.trim().length > 0 &&
				isNaN(prevState.date)
			) {
				return {
					...prevState,
					isValid: true,
				}
			} else {
				return {
					...prevState,
					isValid: false,
				}
			}
		}
		case 'TEXT': {
			if (prevState.isValid == true) {
				return { ...prevState, text: <p style={{ color: 'green' }}>Pomyślnie dodano!<br></br> {prevState.totalEnergy}</p> }
			} else {
				return { ...prevState, text: <p style={{ color: 'red' }}>Nieprawidłowe dane!</p> }
			}
		}
		default:
			return prevState
	}
}

const Form = props => {
	const [state, dispatch] = useReducer(reducerFn, initialState)

	const addDataHandler = () => {
		if (state.isValid == true) {
			const id = state.date
			props.addData(id, state.date, state.totalEnergy)
		} else {
		}
		dispatch({ type: 'TEXT' })
	}

	useEffect(() => {
		dispatch({ type: 'TOTAL_ENERGY' })
		dispatch({ type: 'VALID' })
	}, [state.lostEnergy, state.producedEnergy, state.date])

	return (
		<div className='formbold-main-wrapper'>
			<div className='formbold-form-wrapper'>
				<form>
					<div className='formbold-mb-5'>
						<label htmlFor='lostenergy' className='formbold-form-label'>
							Energia zużyta (18)
						</label>
						<input
							type='text'
							id='lostenergy'
							placeholder='Energia zużyta'
							className='formbold-form-input'
							onChange={event => dispatch({ type: 'COUNT_LOST_ENERGY', value: event.target.value.replace(',', '.') })}
						/>
					</div>
					<div className='formbold-mb-5'>
						<label htmlFor='getenergy' className='formbold-form-label'>
							Energia wyprodukowana (28)
						</label>
						<input
							type='text'
							id='getenergy'
							placeholder='Energia wyprodukowana'
							className='formbold-form-input'
							onChange={event =>
								dispatch({ type: 'COUNT_PRODUCED_ENERGY', value: event.target.value.replace(',', '.') })
							}
						/>
					</div>
					<div className='flex flex-wrap formbold--mx-3'>
						<div className='w-full formbold-px-3'>
							<div className='formbold-mb-5 w-full'>
								<label htmlFor='date' className='formbold-form-label'>
									{' '}
									Data{' '}
								</label>
								<input
									type='date'
									id='date'
									className='formbold-form-input'
									onChange={event => dispatch({ type: 'COUNT_DATE', value: event.target.value })}
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-wrap formbold--mx-3'>
						<div className='w-full formbold-px-3'>
							<div className='formbold-mb-5 w-full'>{state.text}</div>
						</div>
					</div>
				</form>
				<Buttons addData={addDataHandler} />
			</div>
		</div>
	)
}
export default Form
