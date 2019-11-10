const express = require('express');
const yelpAPI = require('yelp-api');
const axios = require('axios');

const apiController = {};

apiController.geolocation = (req, res, next) => {
  const GEO_API = '2f3c481863d2833649b281ba9983b66e';
  
  axios.get(`http://api.ipapi.com/api/check?access_key=${GEO_API}`)
    .then(response => {
      // console.log('GEOLOCATION RES __> ', response.data.zip);
      res.locals.zipcode = response.data.zip;
      // console.log('RES LOCALS ZIP ---> ', res.locals.zipcode);
      return next();
    })
    .catch(err => {
      console.log('ERROR in apiController.geolocation : ', err);
    })
}

apiController.yelp = (req, res, next) => {
  console.log('REQ.BODY --> ', req.body);
  console.log('in middleware func')
  const YELP_API = '0asdq3RZT2Kcg24r5KLnY49GRgND03gI53KjmnXTaFEsPoe8YaSyyhVNciXqh2GGLrV1i7X79sBWjkWw_NhhMeG9GSOOylFrRXxnFSZuLxQvDj-5bOzL1JsZ-UbGXXYx';
  const ENDPOINT = 'https://api.yelp.com/v3/businesses/search';

  // Create a new yelpAPI object with your API key
  let yelp = new yelpAPI(YELP_API);
  
  // Set any parameters, if applicable (see API documentation for allowed params)
  let params = [{ location: req.body.location || res.locals.zipcode }];
  
  // Call the endpoint
  yelp.query('businesses/search', params)
  .then(data => {
    // Success
    // console.log(data);
    return next();
  })
  .catch(err => {
    // Failure
    console.log(err);
  });
}


module.exports = apiController;
