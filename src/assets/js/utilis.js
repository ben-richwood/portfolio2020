import stdinSound from "../sounds/stdin.wav";

class Sound {
	constructor() {
		this.projectSound = new Audio(stdinSound);
	}

	play(sound = "projectSound") {
		if (!this[sound]) return;
		this[sound].play();
	}

	project() {
		this.projectSound.play();
	}
}

export const sound = new Sound();
