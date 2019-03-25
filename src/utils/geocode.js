const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic21pbGVoZHIiLCJhIjoiY2p0NmlyMXByMGhwcTQ0cDdsYmh1dG45YyJ9.OoKfw77s01nPVk6JdzEQKQ&limit=1';

    request({url, json:true}, (err, {body}) => {
        if(err) {
            
            callback('Unable to connect to Location Service',undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.',undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const data = {
                latitude,
                longitude
            };
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
        
    });
};

module.exports = geocode;