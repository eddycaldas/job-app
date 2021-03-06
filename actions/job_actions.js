import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import { FETCH_JOBS, LIKE_JOB } from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip })
  return `${JOB_ROOT_URL}${query}`
};
const echo = prefix => input => {
  console.log(prefix, input)
  return input
}
export const getJobs = region => {
  return Promise.resolve(region)
  .then(echo('region'))
    .then(reverseGeocode)
    .then(echo('geocode'))

    .then(buildJobsUrl)
    .then(echo('buildJobsUrl'))


     .then(axios.get)
     .then(data => data.data.results)
  // let zip = await reverseGeocode(region);
  // const url = buildJobsUrl(zip);
  // let { data } = await axios.get(url);
  // return data
}

export const getZipCode = (latitude, longitude) => { 
  return reverseGeocode({latitude, longitude})
}



export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
  // let zip = await reverseGeocode(region);
  // const url = buildJobsUrl(zip);
  // let { data } = await axios.get(url);
  dispatch({ type: FETCH_JOBS, payload: data });
  callback();
 console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
}