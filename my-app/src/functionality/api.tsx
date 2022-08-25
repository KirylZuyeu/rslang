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

export type Statistic = {
	learnedWords: number
	sprint: {
		arrFalse: string | never[]
		arrRight: string | never[]
		period: number
	}
	audioCall: {
		arrFalse: string | never[]
		arrRight: string | never[]
		period: number
	}
	book: { arrWords: string | never[] }
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
export const getWord = async (id: string) => (await fetch(`${words}/${id}`)).json();

export const getWordsByGroup = async (groupNumber: number) => (await fetch(`${words}/group?group=${groupNumber}`)).json();

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


export const getUser = async (id: string, token: string) => (await fetch(`${users}/${id}`, {
	method: 'GET',
	headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
})).json();

export const changeUser = async (id: string, token: string, data: ChengeDataUser) => 
	(await fetch(`${users}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			email: `${data.email}`,
			password: `${data.password}`
		}),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json()


export const delUser = async (id: string, token: string) => await (fetch(`${users}/${id}`, {
	method: 'DELETE',
	headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
}));

export const getNewUserToken = async (id: string, refreshToken: string) => (await fetch(`${users}/${id}/tokens`, {
	method: 'GET',
	headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${refreshToken}` }
})).json();

//=============USERS WORDS===============

export const getUserWords = async (id: string, token: string) => (await fetch(`${users}/${id}/words`, {
	method: 'GET',
	headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
})).json();

export const createUserWord = async (userId: string, wordId: string, group: string, token: string) => 
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'POST',
		body: JSON.stringify({			
			difficulty: group,
			// optional: {} ?????
		}),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json()


export const getUserWord = async (userId: string, wordId: string, token: string) =>
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'GET',
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json();

export const changeUserWord = async (userId: string, wordId: string, group: string, token: string) => 
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'PUT',
		body: JSON.stringify({			
			difficulty: group,
			// optional: {} ???????????
		}),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json()


export const delUserWord = async (userId: string, wordId: string, token: string) =>
	await (fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'DELETE',
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	}));

//============Users AggregatedWords========================

export const getUsersAggregatedWords =
	async (id: string, token: string, page: number = 1, wordsPerPage: number = 1, group: string = '') =>
		(await fetch(`${users}/${id}/aggregatedWords?page=${page}&wordsPerPage=${wordsPerPage}&group=${group}`, {
			method: 'GET',
			headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
		})).json();

export const getUsersAggregatedWord = async (userId: string, wordId: string, token: string) =>
	(await fetch(`${users}/${userId}/aggregatedWords/${wordId}`, {
		method: 'GET',
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json();

//================Users Statistic=======================

export const getUserStatistic = async (id: string, token: string) => (await fetch(`${users}/${id}/statistics`, {
	method: "GET",
	headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
})).json();

export const changeUserStatistic = async (id: string, token: string, opt: Statistic) => 
	(await fetch(`${users}/${id}/statistics`, {
		method: 'PUT',
		body: JSON.stringify({				
			optional: opt			
		}),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json()

//================Users Setting=======================

export const getUserSetting = async (id: string, token: string) =>
	(await fetch(`${users}/${id}/setting`, {
		method: "GET",
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json();

export const changeUserSetting = async (id: string, token: string) => 
	(await fetch(`${users}/${id}/setting`, {
		method: 'PUT',
		body: JSON.stringify({
			//--------------------------------

			"wordsPerDay": 0,
			"optional": {}

			//--------------------------------
		}),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
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


