type ObjectAny = { [key: string]: any };
type FunctionAny = (any) => any;

enum LOG_LEVEL {
	ERROR,
	WARN,
	INFO,
	DEBUG,
	SILLY,
}

export { ObjectAny, FunctionAny, LOG_LEVEL };
