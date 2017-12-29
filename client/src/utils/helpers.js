import jwtDecode from 'jwt-decode';
import history from '../utils/history';

const decodeToken = token => jwtDecode(token);

const logout = () => {
  window.sessionStorage.removeItem('token');
  history.push('/');
};

export {
  decodeToken,
  logout
};
