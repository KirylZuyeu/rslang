import { FormEvent, useState } from "react";
import styles from "./autorization.module.css";

export default function Authorization() {

	const [isAvtorize, setisAvtorize] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	let variantL = 'autoriz_varia_L';
	let variantR = 'autoriz_varia_R';

	if (isAvtorize) {
		variantL += '_active';
		variantR = 'autoriz_varia_R';
	} else {
		variantL = 'autoriz_varia_L';
		variantR += '_active';
	}

	function checkPasvord() {
		return password === repeatPassword
	}

	function handleSubmit(e: FormEvent) {
		console.log('form', name, email, password === repeatPassword);
		e.preventDefault();
	}

	return (
		<div className={styles.autorization}>
			<div className={styles.wrapper}>
				<div className={styles.autoriz_varia}>

					<div className={styles[variantL]} onClick={() => setisAvtorize(true)}>Регистрация</div>
					<div className={styles[variantR]} onClick={() => setisAvtorize(false)}>Вход</div>

				</div>
				{isAvtorize ?
					<div className={styles.register}>
						<form className={styles.form_register}>
							<div className={styles.form_name}>
								<label className={styles.form_name_lable} htmlFor='name'>Name</label>
								<input className={styles.form_name_text} type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
							</div>
							<div className={styles.form_email}>
								<label className={styles.form_email_lable} htmlFor='email'>Email</label>
								<input className={styles.form_email_text} type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
							<div className={styles.form_pasword}>
								<label className={styles.form_pasword_lable} htmlFor='password'>Password</label>
								<input className={styles.form_pasword_text} type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
							<div className={styles.form_repeat_pasword}>
								<label className={styles.form_repeat_pasword_lable} htmlFor='repeat-password'>Repeat Password</label>
								<input className={styles.form_repeat_pasword_text} type='password' id='repeat_password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
							</div>
							<button className={styles.form_btn} type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
						</form>
					</div>
					: <div className={styles.input}>
						<form className={styles.form_register}>
							<div className={styles.form_email}>
								<label className={styles.form_email_lable} htmlFor='email'>Email</label>
								<input className={styles.form_email_text} type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
							<div className={styles.form_pasword}>
								<label className={styles.form_pasword_lable} htmlFor='password'>Password</label>
								<input className={styles.form_pasword_text} type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
							<button className={styles.form_btn} type="submit" onClick={handleSubmit}>Войти</button>
						</form>
					</div>
				}
			</div>
		</div >	
	)
}



