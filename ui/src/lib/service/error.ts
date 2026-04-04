export class ApiError extends Error {
	constructor(
		public id: AppErrorId,
		public cause: Error,
	) {
		super(id);
		this.id = id;
		this.cause = cause;
	}

	public serialize() {
		return {
			id: this.id,
			message: this.message,
		};
	}

	public static deserialize(error: unknown) {
		if (error instanceof ApiError) {
			return error;
		}
		if (isSerialApiError(error)) {
			return new ApiError(error.id, new Error(error.message));
		}
		return new ApiError(AppErrorId.Unspecific, new Error('Unknown error'));

		function isSerialApiError(error: unknown): error is { id: AppErrorId; message?: string } {
			return typeof error === 'object' && error !== null && 'id' in error && 'message' in error;
		}
	}
}

export enum AppErrorId {
	Unspecific = 'unspecific',
	ApiCancelled = 'apiCancelled',
	Api400 = 'api400',
	Api403 = 'api403',
	Api404 = 'api404',
}
