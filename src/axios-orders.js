import Axios from 'axios';

const instance = Axios.create({
  baseURL: "https://react-my-burger-1689a.firebaseio.com/",
});

export default instance;