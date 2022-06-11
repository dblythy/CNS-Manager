import axios from 'axios';
const session = localStorage.getItem('session');
export let user = {
  sessionToken: '',
  firstName: '',
};
if (session) {
  try {
    user = JSON.parse(session);
    const expiry = new Date(user.expiry);
    if (expiry < new Date()) {
      throw new Error('Expired token');
    }
  } catch (e) {
    console.log({ e });
    localStorage.removeItem('session');
  }
}
const storeSession = (sessionData) => {
  user = sessionData;
  localStorage.setItem('session', JSON.stringify(sessionData));
};
export const mountApi = (app) => {
  app.$savePlan = async function (payload) {
    console.log(
      JSON.stringify({ sessionToken: user.sessionToken, data: payload })
    );
    const { data } = await this.$resolve(
      axios.post(
        `https://script.google.com/macros/s/AKfycbxp3LvKMktlCVBATwRbJMSFkBRQWK9XyqI59Xrab11U0plhmaVUid56PiKBEPG57isR-g/exec`,
        JSON.stringify({
          method: 'savePlan',
          payload: { sessionToken: user.sessionToken, data: payload },
        }),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
      )
    );
    if (typeof data === 'string') {
      this.$showError(data);
    }
    if (!Object.keys(data).length) {
      this.$showError('Could not save plan');
    }
    return data;
  };
  app.$signup = async function (payload) {
    const { data } = await this.$resolve(
      axios.post(
        `https://script.google.com/macros/s/AKfycbxp3LvKMktlCVBATwRbJMSFkBRQWK9XyqI59Xrab11U0plhmaVUid56PiKBEPG57isR-g/exec`,
        JSON.stringify({
          method: 'signup',
          payload,
        }),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
      )
    );
    if (typeof data === 'string') {
      this.$showError(data);
    }
    storeSession(data);
    return data;
  };
  app.$login = async function (payload) {
    const { data } = await this.$resolve(
      axios.post(
        `https://script.google.com/macros/s/AKfycbxp3LvKMktlCVBATwRbJMSFkBRQWK9XyqI59Xrab11U0plhmaVUid56PiKBEPG57isR-g/exec`,
        JSON.stringify({
          method: 'login',
          payload,
        }),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
      )
    );
    if (typeof data === 'string') {
      this.$showError(data);
    }
    storeSession(data);
    return data;
  };
  app.$getPlans = async function () {
    const { data } = await this.$resolve(
      axios.post(
        `https://script.google.com/macros/s/AKfycbxp3LvKMktlCVBATwRbJMSFkBRQWK9XyqI59Xrab11U0plhmaVUid56PiKBEPG57isR-g/exec`,
        JSON.stringify({
          method: 'getPlans',
          payload: { sessionToken: user.sessionToken },
        }),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
      )
    );
    if (typeof data === 'string') {
      this.$showError(data);
    }
    return data;
  };
  app.$logout = async function () {
    const { data } = await this.$resolve(
      axios.post(
        `https://script.google.com/macros/s/AKfycbxp3LvKMktlCVBATwRbJMSFkBRQWK9XyqI59Xrab11U0plhmaVUid56PiKBEPG57isR-g/exec`,
        JSON.stringify({
          method: 'logout',
          payload: { sessionToken: user.sessionToken },
        }),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
      )
    );
    if (typeof data === 'string') {
      this.$showError(data);
    }
    localStorage.removeItem('session');
    user = {
      sessionToken: '',
      firstName: '',
    };
    return data;
  };
};
