type TCb = (...args: any[]) => void;
type TEventName = string;
type TCbKey = string;
type TMapKeyCb = Map<TCbKey, TCb>;
type TMapEventNameKeyCb = Map<TEventName, TMapKeyCb>;

export { TCb, TEventName, TCbKey, TMapKeyCb, TMapEventNameKeyCb };
