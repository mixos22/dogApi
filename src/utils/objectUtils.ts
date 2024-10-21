import _ from 'lodash';

export const getRandomKey = (obj: object) => _.sample(Object.keys(obj));
