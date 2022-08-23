const url = 'https://rslang-be-server.herokuapp.com';

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

export type RespSign = {
	message: string
	name: string
	refreshToken: string
	token: string
	userId: string
}

//=================WORDS=================
export const getWords = async (groupNumber: number, page: number) => (await fetch(`${words}?group=${groupNumber}&page=${page}`)).json();
export const getWord = async (id: number) => (await fetch(`${words}/${id}`)).json();

//==================USERS================
export const createUser = async (data: DataUser) => 
	(await fetch(users, {
		method: 'POST',
		body: JSON.stringify({
			name: `${data.name}`,
			email: `${data.email}`,
			password: `${data.password}`
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()


export const getUser = async (id: number) => (await fetch(`${users}/${id}`)).json();

export const changeUser = async (id: number, data: ChengeDataUser) => 
	(await fetch(`${users}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			email: `${data.email}`,
			password: `${data.password}`
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()


export const delUser = async (id: number) => await (fetch(`${users}/${id}`, { method: 'DELETE' }));

export const getUserTokens = async (id: number) => (await fetch(`${users}/${id}/tokens`)).json();

//=============USERS WORDS===============

export const getUserWords = async (id: number) => (await fetch(`${users}/${id}/words`)).json();

export const createUserWord = async (userId: number, wordId: number) => 
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


export const getUserWord = async (userId: number, wordId: number) => (await fetch(`${users}/${userId}/words/${wordId}`)).json();

export const changeUserWord = async (userId: number, wordId: number) => 
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


export const delUserWord = async (userId: number, wordId: number) =>
	await (fetch(`${users}/${userId}/words/${wordId}`, { method: 'DELETE' }));

//============Users AggregatedWords========================

export const getUsersAggregatedWords = async (id: number, page: number = 1, wordsPerPage: number = 1, group: string = '') =>
	(await fetch(`${users}/${id}/aggregatedWords?page=${page}&wordsPerPage=${wordsPerPage}&group=${group}`)).json();

export const getUsersAggregatedWord = async (userId: number, wordId: number) =>
	(await fetch(`${users}/${userId}/aggregatedWords/${wordId}`)).json();

//================Users Statistic=======================

export const getUserStatistic = async (id: string) => (await fetch(`${users}/${id}/statistics`)).json();

export const changeUserStatistic = async (id: string) => 
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

//================Users Setting=======================

export const getUserSetting = async (id: number) => (await fetch(`${users}/${id}/setting`)).json();

export const changeUserSetting = async (id: number) => 
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


//=================Sign In====================

export const signIn = async (data: ChengeDataUser) =>
	(await fetch(signin, {
		method: 'POST',
		body: JSON.stringify({			
			email: data.email,
			password: data.password			
		}),
		headers: { 'Content-Type': 'application/json' }
	})).json()


