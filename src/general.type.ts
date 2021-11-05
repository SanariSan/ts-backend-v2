type ObjectAny = { [key: string]: any };
type FunctionAny = (any) => any;

enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  SILLY,
}

export { ObjectAny, FunctionAny, LogLevel };
