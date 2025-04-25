type ExtendedApiResponseData<T> = T extends Array<infer U>
? ((U & Record<string, any>) | undefined | null)[]
: (T & Record<string, any>) | undefined | null;

export interface ApiResponse<T = any> {
  success: boolean;
  //data?: (T & Record<string, any>) | null | undefined;
  data?: T | ExtendedApiResponseData<T>
  message?: string;
}
