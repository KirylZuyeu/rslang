import { type } from "@testing-library/user-event/dist/type";


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

export type UserWord = {
	difficulty: string,
	id: string,
	optional: {
		repeat: number
	}
}

type ooo = {
	sprint: {
		arrLearnedWords: string[] | never[]
		arrFalse: string[] | never[]
		arrRight: string[] | never[]
		sumRight: number
		sumAll: number
		period: number
	}
	audioCall: {
		arrLearnedWords: string[] | never[]
		arrFalse: string[] | never[]
		arrRight: string[] | never[]
		sumRight: number
		sumAll: number
		period: number
	}
	book: { arrWords: string[] | never[] }
	arrLearnedWords: { arr: string[] }
	date: string
}

export type OptionStatistics = {
	sprint: {
		arrLearnedWords: string[] | never[]
		arrFalse: string[] | never[]
		arrRight: string[] | never[]
		sumRight: number
		sumAll: number
		period: number
	}
	audioCall: {
		arrLearnedWords: string[] | never[]
		arrFalse: string[] | never[]
		arrRight: string[] | never[]
		sumRight: number
		sumAll: number
		period: number
	}
	book: { arrWords: string[] | never[] }
	arrLearnedWords: { arr: string[] }
	date: string
	longTimeStatistic: Record<string, Record<string, ooo|number>>
}

export const objStatisticZero = {
	sprint: {
		arrLearnedWords: [],
		arrFalse: [],
		arrRight: [],
		sumRight: 0,
		sumAll: 0,
		period: 0
	},
	audioCall: {
		arrLearnedWords: [],
		arrFalse: [],
		arrRight: [],
		sumRight: 0,
		sumAll: 0,
		period: 0
	},
	book: { arrWords: [] },
	arrLearnedWords: { arr: [] },
	date: ' ',
	longTimeStatistic: {}
}

export type Statistic = {
	learnedWords: number
	optional: OptionStatistics
}


export type RespSign = {
	message: string
	name: string
	refreshToken: string
	token: string
	userId: string
}

export type WordType = {
	difficulty: string,
	optional: {repeat:number},
	wordId:string
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

export const createUserWord = async (userId: string, wordId: string, group: string, repeat:number, token: string) =>
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'POST',
		body: JSON.stringify({
			difficulty: group,
			optional: {repeat}
		}),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json()


export const getUserWord = async (userId: string, wordId: string, token: string) =>
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'GET',
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})).json();

export const changeUserWord = async (userId: string, wordId: string, group: string, repeat:number, token: string) =>
	(await fetch(`${users}/${userId}/words/${wordId}`, {
		method: 'PUT',
		body: JSON.stringify({
			difficulty: group,
			optional: {repeat}
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

export const getUserStatistic = async (id: string, token: string) => await fetch(`${users}/${id}/statistics`, {
	method: 'GET',
	headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
})
	.then(res => res.json())
	// .catch(err => console.log(err))


export const changeUserStatistic = async (id: string, token: string, num: number, opt: OptionStatistics) =>
	await fetch(`${users}/${id}/statistics`, {
		method: 'PUT',
		body: JSON.stringify(
			{
				'learnedWords': num,
				'optional': opt
			}
		),
		headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
	})
	.then(res => res.json())

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
	await fetch(signin, {
		method: 'POST',
		body: JSON.stringify({
			email: data.email,
			password: data.password
		}),
		headers: { 'Content-Type': 'application/json' }
	}).then(res => res.json())


export const checkToken = () => {
	let time = Date.now();	
	const prevTime = localStorage.getItem('t');
	if (prevTime) {
		let t = +JSON.parse(prevTime);
		console.log(t, 'ttt', time);
		if ((time - t) > 14400000) {
			return false;
		}
		return true;
	}
}



