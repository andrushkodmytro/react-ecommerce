const base = 'http://localhost:8081';

const service = {
  async get(
    url: string,
    params?: { [key: string]: string | number | string[] },
  ) {
    const jsonObj: any = localStorage.getItem('auth');
    const token = JSON.parse(jsonObj)?.token;

    const newUrl = new URL(url, base);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'object') {
          return newUrl.searchParams.append(key, JSON.stringify(value));
        }

        newUrl.searchParams.append(key, value.toString());
      });
    }

    const res = await fetch(newUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
    const data = res.json();
    return data;
  },
  async post(url: string, body: any) {
    const jsonObj: any = localStorage.getItem('auth');
    const token = JSON.parse(jsonObj)?.token;

    const newUrl = new URL(url, base);

    const res = await fetch(newUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    return data;
  },
  async patch(url: string, body: any) {
    const jsonObj: any = localStorage.getItem('auth');
    const token = JSON.parse(jsonObj)?.token
    // 'Authorization': `Bearer ${auth.token}`}
    const newUrl = new URL(url, base);

    const res = await fetch(newUrl.toString(), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    return data;
  },
  async remove(url: string, body: any) {
    const jsonObj: any = localStorage.getItem('auth');
    const token = JSON.parse(jsonObj)?.token
    // 'Authorization': `Bearer ${auth.token}`}
    const newUrl = new URL(url, base);

    const res = await fetch(newUrl.toString(), {
      method: 'REMOVE',
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
      },
      mode: 'cors', // no-cors, *cors, same-origin
      body: JSON.stringify(body),
    });
    const data = res.json();
    return data;
  },
};

export default service;
