import { useEffect } from "react"
import { getUserStatistic } from "./api"

type GamesOptions = {
	arrFalse: string[]
	arrRight: string[]
	period: number
}

type BookOptions = {
	arrWords: string[]
}

type Options = {
	sprint: GamesOptions
	audioCall: GamesOptions
	book: BookOptions
}



export default function statisticLogic() {

	useEffect(() => {
		getUserStatistic('5555555')
	})

	const option = {
		sprint: {
			arrFalse: [],
			arrRight: [],
			period: 0
		},
		audioCall: {
			arrFalse: [],
			arrRight: [],
			period: 0
		},
		book: {
			arrWords: []
		}
	}
}

