import { EventEmitter } from "stream";
import { randomHex } from "../../../helpers/util";
import { NoEventOrKeyError } from "../../errors/generic";
import {
	TCb,
	TEName,
	TENameKeyCb,
	TGetEmitterKeyCbMapsListener,
	TKey,
	TKeyCb,
} from "./native.events.type";

class EventEmitterStatic {
	private static emitters = new Map<CustomEventEmitter, TENameKeyCb>();

	public static setCurrentClassInstance(currentClassInstance) {
		this.emitters.set(currentClassInstance, new Map());
	}

	public static removeCurrentClassInstance(currentClassInstance) {
		this.emitters.delete(currentClassInstance);
	}

	public static getENamesMaps(currentClassInstance): TENameKeyCb | never {
		const result = this.emitters.get(currentClassInstance);

		return <TENameKeyCb>result;
	}

	public static getEmitterKeyCbMapsListener(
		eventName: TEName,
		key: TKey,
	): TGetEmitterKeyCbMapsListener {
		// loop through all emitter instances
		for (let [emitter, eNamesMaps] of this.emitters) {
			// loop through all eventNames maps
			for (let [eventNameStored, keyCbMaps] of eNamesMaps) {
				if (eventNameStored !== eventName) continue;
				if (!keyCbMaps.has(key)) continue;

				const listener = <TCb>keyCbMaps.get(key);

				return {
					emitter,
					keyCbMaps,
					listener,
				};
			}
		}

		throw new NoEventOrKeyError(`Event: ${eventName}, Key: ${key}`);
	}
}

class CustomEventEmitter extends EventEmitter {
	constructor() {
		super();

		EventEmitterStatic.setCurrentClassInstance(this);
	}

	public onByKey(eventName: TEName, listener: TCb, key: TKey = randomHex()): TKey | never {
		const eNamesMaps = EventEmitterStatic.getENamesMaps(this);
		if (!eNamesMaps.has(eventName)) {
			eNamesMaps.set(eventName, new Map());
		}

		const keyCbMaps = <TKeyCb>eNamesMaps.get(eventName);

		keyCbMaps.set(key, listener);
		super.on(eventName, listener);

		return key;
	}

	// can throw if no Event Or Key found
	public offByKey(eventName: TEName, key): void | never {
		const result = EventEmitterStatic.getEmitterKeyCbMapsListener(eventName, key);
		const { emitter, keyCbMaps, listener } = result;

		keyCbMaps.delete(key);
		emitter.off(eventName, listener);
	}

	// TODO: add caching map after checking key to not loop every time, maybe do caching every X seconds
	public hasKey(eventName: TEName, key): boolean {
		try {
			EventEmitterStatic.getEmitterKeyCbMapsListener(eventName, key);
			return true;
		} catch (e) {
			return false;
		}
	}

	public clearAllListeners(): void {
		this.removeAllListeners();
		EventEmitterStatic.removeCurrentClassInstance(this);
		EventEmitterStatic.setCurrentClassInstance(this);
	}
}

export { CustomEventEmitter };
