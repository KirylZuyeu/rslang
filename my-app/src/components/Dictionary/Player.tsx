import React, { useState, useEffect } from "react";
type Props = {
	url: string
}
const useAudio = (url: string) => {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	const toggle = () => setPlaying(!playing);

	useEffect(() => {
		playing ? audio.play() : audio.pause();
	},
		[playing]
	);

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false));
		return () => {
			audio.removeEventListener('ended', () => setPlaying(false));
		};
	}, []);

	return [playing, toggle];
};

const Player = (props: Props) => {
	console.log(props);

	const [playing, toggle] = useAudio(props.url);

	return (
		<div>
			<button onClick={() => toggle}>{playing ? "Pause" : "Play"}</button>
		</div>
	);
};

export default Player;
