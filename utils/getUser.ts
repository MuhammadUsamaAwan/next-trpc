import baseUrl from './baseUrl';

export default async function getUser(): Promise<null | User> {
  try {
    const res = await fetch(`${baseUrl}/auth.getUser`, {
      cache: 'no-cache',
    });
    const json = await res.json();
    return json?.result?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
