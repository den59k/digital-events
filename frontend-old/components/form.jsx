import cn from 'classnames'
import { useState } from 'react'

import styles from './form.module.sass'

const items = {
	name: { label: "Имя", placeholder: "Введите ваше имя" },
	mail: { label: "Электронная почта", placeholder: "Введите ваш e-mail" },
	phone: { label: "Телефон", placeholder: "Введите ваш номер телефона" },
	message: { label: "Сообщение", placeholder: "Напишите ваше сообщение" },
}

export function Form({className}){
	const [ values, setValues ] = useState({})

	const onChange = (obj) => {
		console.log(obj)
		setValues({...values, ...obj})
	}

	const onSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<form onSubmit={onSubmit} className={cn(className, styles.form)}>
			{Object.keys(items).map(key => (
				<Input key={key} name={key} {...items[key]} onChange={onChange} value={values[key]}/>
			))}
			<div className={styles.buttons}>
				<button className="a">Отправить</button>
				<button className="a">Отправить в Telegram</button>
			</div>
		</form>
	)
}

export function Input ({label, placeholder, name, value, onChange}){

	const _onChange = (e) => {
		const value = e.target.value
		onChange({[name]: value})
	}
	
	return (
		<div className={styles.input}>
			<label>{label}</label>
			<input type="text" placeholder={placeholder} name={name} value={value || ""} onChange={_onChange}/>
		</div>
	)
}
