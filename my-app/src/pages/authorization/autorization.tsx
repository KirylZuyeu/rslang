import { useState } from 'react';
import { useForm } from 'react-hook-form'
import styles from "./autorization.module.css";

type FormValues = {
	Name: string
	Email: string
	Password: string
	Repeat_Password: string
}

export default function Autorization() {
	const { register, formState: { errors }, handleSubmit, reset } = useForm<FormValues>({ mode: 'onBlur' })
	const [isAvtorize, setisAvtorize] = useState(false);

	function onSubmit(data: FormValues) {
		if (checkPasvord(data.Password, data.Repeat_Password)) {
			console.log(data);
			reset()
		} else {
			console.log('err')
		}
	}

	let variantL = 'autoriz_varia_L';
	let variantR = 'autoriz_varia_R';

	if (isAvtorize) {
		variantL += '_active';
		variantR = 'autoriz_varia_R';
	} else {
		variantL = 'autoriz_varia_L';
		variantR += '_active';
	}
	function checkPasvord(p: string, rp: string) {
		return p === rp
	}

	return (
		<div className={styles.autorization}>
			<div className={styles.wrapper}>
				<div className={styles.autoriz_varia}>
					<div className={styles[variantR]} onClick={() => setisAvtorize(false)}>Вход</div>
					<div className={styles[variantL]} onClick={() => setisAvtorize(true)}>Регистрация</div>
				</div>
				{!isAvtorize
					? <div className={styles.register}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.form_block}>
								<label className={styles.lable}>Email
									<input className={styles.input} type="email" {...register("Email", {
										required: 'Обязательно заполнить',
										minLength: {
											value: 4,
											message: 'Не менее 4 символов'
										}
									})} />
								</label>
								<div>
									{errors?.Email && <p>{`${errors?.Email?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Password
									<input className={styles.input} type='password' {...register('Password', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 8,
											message: 'Не менее 8 символов'
										}
									})} />
								</label>
								<div>
									{errors?.Password && <p>{`${errors?.Password?.message}` || 'Error'}</p>}
								</div>
							</div>
							<input className={styles.form_btn} type="submit" />
						</form>
					</div>
					: <div className={styles.input}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.form_block}>
								<label className={styles.lable}>Name
									<input className={styles.input} {...register('Name', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 3,
											message: 'Не менее 3 символов'
										}
									})} />
								</label>
								<div>
									{errors?.Name && <p>{`${errors?.Name?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Email
									<input className={styles.input} type="email" {...register("Email", {
										required: 'Обязательно заполнить',
										minLength: {
											value: 4,
											message: 'Не менее 4 символов'
										}
									})} />
								</label>
								<div>
									{errors?.Email && <p>{`${errors?.Email?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Password
									<input className={styles.input} type='password' {...register('Password', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 8,
											message: 'Не менее 8 символов'
										}
									})} />
								</label>
								<div>
									{errors?.Password && <p>{`${errors?.Password?.message}` || 'Error'}</p>}
								</div>
							</div>
							<div className={styles.form_block}>
								<label className={styles.lable}>Repeat Password
									<input className={styles.input} type='password' {...register('Repeat_Password', {
										required: 'Обязательно заполнить',
										minLength: {
											value: 8,
											message: 'Не менее 8 символов'
										}
									})} />
								</label>
								<div>
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
