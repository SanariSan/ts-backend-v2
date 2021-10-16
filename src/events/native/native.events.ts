import { EventEmitter } from "stream";
import { randomHex } from "../../helpers/util";
import { TCb, TCbKey, TEventName, TMapEventNameKeyCb, TMapKeyCb } from "./native.events.type";

class EventEmitterStatic {
	public static eventEmittersMap = new Map<CustomEventEmitter, TMapEventNameKeyCb>();
	public static setCurrentClassInstance(currentClassInstance) {
		this.eventEmittersMap.set(currentClassInstance, new Map());
	}
	public static getEventNamesKeyCbMap(currentEmitterInstance) {
		// Map<eName->Map<Key->cb>>
		return <TMapEventNameKeyCb>this.eventEmittersMap.get(currentEmitterInstance);
	}

	public static getKeyCbMap(eventName, eventNamesKeyCbMap: TMapEventNameKeyCb): TMapKeyCb {
		if (!eventNamesKeyCbMap.has(eventName)) {
			eventNamesKeyCbMap.set(eventName, new Map());
		}

		return <TMapKeyCb>eventNamesKeyCbMap.get(eventName);
	}

	// loop through all emitters instances, return all Maps with matching eventName
	public static getEmitterKeyCbMaps(eventName): Map<CustomEventEmitter, TMapKeyCb> {
		const eventNamesKeyCbMaps = new Map<CustomEventEmitter, TMapKeyCb>();

		for (let [emitterInstance, eventNameKeyCbMap] of this.eventEmittersMap) {
			if (eventNameKeyCbMap.has(eventName)) {
				eventNamesKeyCbMaps.set(
					emitterInstance,
					<TMapKeyCb>eventNameKeyCbMap.get(eventName),
				);
			}
		}

		return eventNamesKeyCbMaps;
	}

	//only for caller class instance
	public static getEmitterAndListenerByKey(eventName, key) {
		const eventNamesKeyCbMaps = this.getEmitterKeyCbMaps(eventName);

		// at the point we couldn't find map for specified eventName, so create one
		for (let [emitterInstance, keyCbMap] of eventNamesKeyCbMaps) {
			const listener = keyCbMap.get(key);

			if (listener !== undefined) {
				return { emitterInstance, keyCbMap, listener };
			}
		}

		throw new Error("todo: Probably unsubbed earlier using this key or NO key like this");
	}
}

class CustomEventEmitter extends EventEmitter {
	constructor() {
		super();

		EventEmitterStatic.setCurrentClassInstance(this);
	}

	public onByKey(eventName: TEventName, listener: TCb, key: TCbKey = randomHex()): TCbKey {
		const eventNamesKeyCbMap = EventEmitterStatic.getEventNamesKeyCbMap(this); //eName-><Key->cb>
		const keyCbMap = EventEmitterStatic.getKeyCbMap(eventName, eventNamesKeyCbMap);

		keyCbMap.set(key, listener);
		super.on(eventName, listener);

		return key;
	}

	public offByKey(eventName: TEventName, key: TCbKey) {
		// can throw
		const { emitterInstance, keyCbMap, listener } =
			EventEmitterStatic.getEmitterAndListenerByKey(eventName, key);

		keyCbMap.delete(key);
		emitterInstance.off(eventName, listener);
	}
}

export { CustomEventEmitter };
