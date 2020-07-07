import axios from "axios";

export default function api(options) {
  console.log("api url", process.env.REACT_APP_API_URL);
  console.log(options);
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3015/";

  return axios({
    method: options.method,
    url: `${BASE_URL}${options.uri}`,
    data: options.body,
  }).then(function (response) {
    // console.log('api')
    //console.log(response) ;
    return response;
  });

  //return 'Welcome';
}
