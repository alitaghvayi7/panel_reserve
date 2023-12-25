export const baseUrl = "http://parliament.elmond.ir";

const endPoints = {};

const getRequest = async ({
  endPoint,
  params,
  revalidate,
  headers,
}: {
  endPoint: string;
  params?: any;
  revalidate?: number;
  headers?: {
    Authorization: string;
  };
}) => {
  const reqHeaders: HeadersInit = headers?.Authorization
    ? {
        Authorization: `Bearer ${headers.Authorization}`,
      }
    : {};

  const req = fetch(`${baseUrl}${endPoint}`, {
    method: "GET",
    headers: { ...reqHeaders },
  });
};
