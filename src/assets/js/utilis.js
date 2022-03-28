import stdinSound from "../sounds/stdin.wav";
import hudSound from "../sounds/hud.m4a";
import store from './store/index.js';

class Sound {
	constructor() {
		this.projectSound = new Audio(stdinSound);
		this.hudSound = new Audio(hudSound);
	}

	play(sound = "projectSound") {
		if (!this[sound]) return;
		this[sound].play();
	}

	project() {
		if (store.state.settings.isSoundOn) this.projectSound.play();
	}
	hud() {
		if (store.state.settings.isSoundOn) this.hudSound.play();
	}
}

export const sound = new Sound();
