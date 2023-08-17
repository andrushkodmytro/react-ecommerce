

class Auth {
  isAuthenticated = () => {
    const session = JSON.parse(localStorage.getItem('auth') || '');

    return !!session && new Date().getTime() / 1000 < session.expiresIn;
  };

  removeSession = () => {
    localStorage.removeItem('auth');
  };



  setSession = (authResult: any) => {
    localStorage.setItem('auth', JSON.stringify(authResult));
  };

  setUser = (data = {}) => {
    let session = localStorage.get('auth');
    session.user = { ...session.user, ...data };
    this.setSession(session);
  };

  getUser = () => {
    const jsonData = localStorage.getItem('auth');
    const session: any = jsonData ? JSON.parse(jsonData) : null;
    const user = session && session?.user;
    return user || null;
  };

  // setHeaders = (headers: any) => {
  //   const session = store.get('auth') || {};
  //   session.headers = { ...headers };
  //   this.setSession(session);
  // };
}
const auth = new Auth()

export default auth;