export interface ServiceOptions {
	accessToken?: string;
	cancellationToken?: AbortSignal;
}

export interface ServiceResponse<T> {
	status: number;
	payload: T;
}
