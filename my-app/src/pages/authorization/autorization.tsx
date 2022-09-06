import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context';
import { changeUserStatistic, createUser, objStatisticZero, signIn } from '../../functionality/api';

import styles from "./autorization.module.css";

type FormValues = {
	Name: string
	Email: string
	Password: string
	Repeat_Password: string
}


export default function Autorization() {
	const { register, formState: { errors }, handleSubmit, reset, watch } = useForm<FormValues>({ mode: 'onBlur' })
	const [error, setError] = useState(false);
	const [isAvtorize, setisAvtorize] = useState(false);
	const [isIn, setIsin] = useState(false);
	const appContext = useContext(Context);
	const navigate = useNavigate();

	const password = useRef({});
	password.current = watch("Password", "");

	function onSubmitReg(data: FormValues) {
		createUser({
			name: data.Name,
			email: data.Email,
			password: data.Password
		})
			.then(result => {localStorage.setItem('first', JSON.stringify(false))})
			.catch(err => console.log('repeat registration', err))
		reset()
		setisAvtorize(false);		
	}

	function onSubmitIn(data: FormValues) {		
		signIn({
			email: data.Email,
			password: data.Password
		})
			.then((res) => {
				if(JSON.parse(localStorage.getItem('first') as string) === false) {
					changeUserStatistic(res.userId , res.token, 0, objStatisticZero).then(()=> localStorage.setItem('first', JSON.stringify(true)))
				}			
					setIsin(true);
					localStorage.setItem('a', JSON.stringify(res))
					const date = Date.now();
					console.log("---------------", date);
				localStorage.setItem('t', JSON.stringify(date))			
			})
			.catch(() => setError(true))
	}


	useEffect(() => {
		if (isIn) {
			reset()
			navigate('/cabinet')
			appContext?.setIsAvtorization(true);
		}
		if (error) {
			console.log('пароль не правильный');
		}
	}, [isIn])

	let variantL = 'autoriz_varia_L';
	let variantR = 'autoriz_varia_R';

	if (isAvtorize) {
		variantL += '_active';
		variantR = 'autoriz_varia_R';
	} else {
		variantL = 'autoriz_varia_L';
		variantR += '_active';
	}

	return (

		<div className={styles.autorization}>
			{error ? <div className={styles.error}>
				<div className={styles.error_wrapp}>
					Не верный пароль
					<button className={styles.error_btn} onClick={() => setError(false)}>назад</button>
				</div>
			</div> : null}
			<div className={styles.wrapper}>
				<div className={styles.autoriz_varia}>
					<div className={styles[variantR]} onClick={() => setisAvtorize(false)}>Вход</div>
					<div className={styles[variantL]} onClick={() => setisAvtorize(true)}>Регистрация</div>
				</div>
				{!isAvtorize
					? <div className={styles.logIn}>
						<form onSubmit={handleSubmit(onSubmitIn)}>
							<div className={styles.form_block}>
								<label className={styles.lable}>Email</label>
									<input className={styles.input} type="email" {...register("Email", {
										required: 'Обязательно заполнить',
										minLength: {
											value: 4,
											message: 'Не менее 4 символов'
										}
									})} />
								<div className={styles.err_message}>
									{errors?.Email && <p>{`${errors?.Email?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Password</label>
									<input className={styles.input} type='password' {...register('Password', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 8,
											message: 'Не менее 8 символов'
										}
									})} />
								<div className={styles.err_message}>
									{errors?.Password && <p>{`${errors?.Password?.message}` || 'Error'}</p>}
								</div>
							</div>
							<input className={styles.form_btn} type="submit" />
						</form>
					</div>
					: <div className={styles.register}>
						<form onSubmit={handleSubmit(onSubmitReg)}>
							<div className={styles.form_block}>
								<label className={styles.lable}>Name</label>
									<input className={styles.input} {...register('Name', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 3,
											message: 'Не менее 3 символов'
										}
									})} />
								<div className={styles.err_message}>
									{errors?.Name && <p>{`${errors?.Name?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Email</label>
									<input className={styles.input} type="email" {...register("Email", {
										required: 'Обязательно заполнить',
										minLength: {
											value: 4,
											message: 'Не менее 4 символов'
										}
									})} />
								<div className={styles.err_message}>
									{errors?.Email && <p>{`${errors?.Email?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Password</label>
									<input className={styles.input} type='password' {...register('Password', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 8,
											message: 'Не менее 8 символов'
										}
									})} />
								<div className={styles.err_message}>
									{errors?.Password && <p>{`${errors?.Password?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Repeat Password</label>
									<input className={styles.input} type='password' {...register('Repeat_Password', {
										required: 'Обязательно заполнить',
										validate: v => v === password.current || 'пароли не равны',
										minLength: {
											value: 8,
											message: 'Не менее 8 символов'
										}
									})} />
								<div className={styles.err_message}>
									{errors?.Repeat_Password && <p>{`${errors?.Repeat_Password?.message}` || 'Error'}</p>}
								</div>
							</div>
							<input className={styles.form_btn} type="submit" />
						</form>
					</div>
				}
			</div>
		</div >

	)
}
