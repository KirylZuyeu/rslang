const url = 'https://react-learnwords-example.herokuapp.com';
const words = `${url}/words`;
const users = `${url}/users`;
const signin = `${url}/signin`;

type DataUser = {
	name: string,
	email: string,
	password: string
}

type ChengeDataUser = {
	email: string,
	password: string
}

//=================WORDS=================
export const getWords = async (groupNumber: number, page: number) => await fetch(`${words}?group=${groupNumber}&page=${page}`);
export const getWord = async (id: number) => await fetch(`${words}/${id}`);

//==================USERS================
export const greateCar = async (data: DataUser) => {
	(await fetch(users, {
		method: 'POST',
		body: JSON.stringify({
			name: `${data.name}`,
			email: `${data.email}`,
			password: `${data.password}`
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}

export const getUser = async (id: number) => await fetch(`${users}/${id}`);

export const changeCar = async (id: number, data: ChengeDataUser) => {
	(await fetch(`${users}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			email: `${data.email}`,
			password: `${data.password}`
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}

export const delUser = async (id: number) => await (await (fetch(`${users}/${id}`, { method: 'DELETE' }))).json();

export const getUserTokens = async (id: number) => await fetch(`${users}/${id}/tokens`);

//=============USERS WORDS===============

export const getUserWords = async (id: number) => await fetch(`${users}/${id}/words`);

export const createUserWord = async (userId: number, wordId: number) => {
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'POST',
		body: JSON.stringify({
			//--------------------------------
			"difficulty": "string",
			"optional": {}
			//--------------------------------
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}

export const getUserWord = async (userId: number, wordId: number) => await fetch(`${users}/${userId}/words/${wordId}`);

export const changeUserWord = async (userId: number, wordId: number) => {
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'PUT',
		body: JSON.stringify({
			//--------------------------------
			"difficulty": "string",
			"optional": {}
			//--------------------------------
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}

export const delUserWord = async (userId: number, wordId: number) =>
	await (await (fetch(`${users}/${userId}/words/${wordId}`, { method: 'DELETE' }))).json();

//============Users AggregatedWords========================

export const getUsersAggregatedWords = async (id: number, page: number = 1, wordsPerPage: number = 1, group: string = '') =>
	await fetch(`${users}/${id}/aggregatedWords?page=${page}&wordsPerPage=${wordsPerPage}&group=${group}`);

export const getUsersAggregatedWord = async (userId: number, wordId: number) =>
	await fetch(`${users}/${userId}/aggregatedWords/${wordId}`);

//================Users Statistic=======================

export const getUserStatistic = async (id: number) => await fetch(`${users}/${id}/statistics`);

export const changeUserStatistic = async (id: number) => {
	(await fetch(`${users}/${id}/statistics`, {
		method: 'PUT',
		body: JSON.stringify({
			//--------------------------------

			"learnedWords": 0,
			"optional": {}

			//--------------------------------
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}
//================Users Setting=======================

export const getUserSetting = async (id: number) => await fetch(`${users}/${id}/setting`);

export const changeUserSetting = async (id: number) => {
	(await fetch(`${users}/${id}/setting`, {
		method: 'PUT',
		body: JSON.stringify({
			//--------------------------------

			"wordsPerDay": 0,
			"optional": {}

			//--------------------------------
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}

//=================Sign In====================

export const signIn = async () => {
	(await fetch(signin, {
		method: 'POST',
		body: JSON.stringify({
			//-----------------------------------
			"email": "string",
			"password": "string"
			//-------------------------------------------
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()
}
