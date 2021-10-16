namespace ERROR {
	export namespace ERROR_ORIGIN {
		export namespace INTERNAL {
			export const NAME = "INTERNAL";
			export type TYPE = "INTERNAL";
		}
		export namespace EXTERNAL {
			export const NAME = "EXTERNAL";
			export type TYPE = "EXTERNAL";
		}
	}

	export namespace INTERNAL {
		export namespace REQUEST {
			export const NAME = "REQUEST";
			export type TYPE = "REQUEST";
		}
		export namespace RESPONSE {
			export namespace NO_DATA {
				export const NAME = "NO_DATA";
				export type TYPE = "NO_DATA";
			}
			export namespace NO_RESPONSE {
				export const NAME = "NO_RESPONSE";
				export type TYPE = "NO_RESPONSE";
			}
			export namespace NO_RESULT {
				export const NAME = "NO_RESULT";
				export type TYPE = "NO_RESULT";
			}
			export namespace BAD_STATUS {
				export const NAME = "BAD_STATUS";
				export type TYPE = "BAD_STATUS";
			}
		}
		export namespace CLI {
			export namespace PROMPT {
				export namespace NO_ENTRY {
					export const NAME = "NO_ENTRY";
					export type TYPE = "NO_ENTRY";
				}
			}
			export namespace DASHBOARD {
				export const NAME = "DASHBOARD";
				export type TYPE = "DASHBOARD";
			}
		}
		export namespace EVENTS {
			export namespace NATIVE {}
			export namespace PUBSUB {
				export namespace NO_CLIENT {
					export const NAME = "NO_CLIENT";
					export type TYPE = "NO_CLIENT";
				}
			}
		}
	}

	export namespace EXTERNAL {}
}

type ERROR_ORIGIN = ERROR.ERROR_ORIGIN.EXTERNAL.TYPE | ERROR.ERROR_ORIGIN.INTERNAL.TYPE;
type ERROR_TYPE =
	| ERROR.INTERNAL.CLI.DASHBOARD.TYPE
	| ERROR.INTERNAL.CLI.PROMPT.NO_ENTRY.TYPE
	| ERROR.INTERNAL.REQUEST.TYPE
	| ERROR.INTERNAL.RESPONSE.BAD_STATUS.TYPE
	| ERROR.INTERNAL.RESPONSE.NO_DATA.TYPE
	| ERROR.INTERNAL.RESPONSE.NO_RESPONSE.TYPE
	| ERROR.INTERNAL.RESPONSE.NO_RESULT.TYPE
	| ERROR.INTERNAL.EVENTS.PUBSUB.NO_CLIENT.TYPE;

export { ERROR, ERROR_ORIGIN, ERROR_TYPE };
