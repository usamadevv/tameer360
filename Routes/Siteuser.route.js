// Importing important Siteuserds
const express = require('express');
const stream = require('stream');
const app = express();
const Siteroute = express.Router();
const admin = require("firebase-admin");
const fileUpload = require('express-fileupload');
const serviceAccount = require('../serviceaccount.json');
const https = require('https');
const { ObjectId } = require('mongodb');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://superstar-24f98.appspot.com"
});
var bucket = admin.storage().bucket();

let Siteuserd = require('../Models/Siteuser');
var nodemailer = require('nodemailer');
const Email = require('../Models/Email');
const authenticate = require('../middleWare.js/Authenticate');
const Client = require('../Models/Cleint');

app.use(fileUpload())




Siteroute.route('/uploadfile').post(function (req, res) {


    console.log(req.body)
    const uploadPicture = function () {
        return new Promise((resolve, reject) => {

            let bufferStream = new stream.PassThrough();
            bufferStream.end(new Buffer.from(req.body.image.replace('data:image/jpeg;base64,', ''), 'base64'));

            // Retrieve default storage bucket

            // Create a reference to the new image file
            const currentDate = new Date();
            let file = bucket.file(`img/${currentDate.getTime().toString()}.jpg`);

            bufferStream.pipe(file.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg'
                }
            }))


                .on('error', error => {
                    reject(`news.provider#uploadPicture - Error while uploading picture ${JSON.stringify(error)}`);
                })
                .on('finish', (file) => {
                    // The file upload is complete.
                    console.log("news.provider#uploadPicture - Image successfully uploaded: ", JSON.stringify(file));
                });

            const config = {
                action: 'read',
                expires: '03-01-2500'
            };
            let downloadUrl = file.getSignedUrl(config, (error, url) => {
                if (error) {
                    reject(error);
                }
                console.log('download url ', url);
                Siteuserd.findByIdAndUpdate(
                    { _id: req.body._id },

                    {
                        imgurl: url

                    },

                    function (error, success) {
                        if (error) {
                            console.log(error)
                            res.send('error')
                        } else {
                            if (!success) {

                                res.send('invalid')
                            }
                            else {

                                res.status(200).json({ 'Siteuserd': url });
                            }

                        }
                    }


                )
                resolve(url);


            });
        })
    };
    uploadPicture()



});
Siteroute.route('/uploadcert').post(function (req, res) {


    console.log(req.body)
    const uploadPicture = function () {
        return new Promise((resolve, reject) => {

            let bufferStream = new stream.PassThrough();
            let bufferStream2 = new stream.PassThrough();
            bufferStream.end(new Buffer.from(req.body.front.replace('data:image/jpeg;base64,', ''), 'base64'));
            bufferStream2.end(new Buffer.from(req.body.back.replace('data:image/jpeg;base64,', ''), 'base64'));

            // Retrieve default storage bucket

            // Create a reference to the new image file
            const currentDate = new Date();
            let file = bucket.file(`img/${currentDate.getTime().toString()}.jpg`);
            let file2 = bucket.file(`img/${currentDate.getTime().toString()}56.jpg`);

            bufferStream.pipe(file.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg'
                }
            }))
            bufferStream2.pipe(file2.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg'
                }
            }))


                .on('error', error => {
                    reject(`news.provider#uploadPicture - Error while uploading picture ${JSON.stringify(error)}`);
                })
                .on('finish', (file) => {
                    // The file upload is complete.
                    console.log("news.provider#uploadPicture - Image successfully uploaded: ", JSON.stringify(file));
                });

            const config = {
                action: 'read',
                expires: '03-01-2500'
            };
            let downloadUrl = file.getSignedUrl(config, (error, url) => {

                let downloadUrl2 = file2.getSignedUrl(config, (errorn, urlx) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('download url ', url);


                    Siteuserd.findByIdAndUpdate(
                        { _id: req.body._id },
                        {
                            $push: {
                                ids: {
                                    idname: 'Certificate',
                                    front: url,
                                    back: urlx,
                                }
                            }

                        },

                        function (error, success) {
                            if (error) {
                                console.log(error)
                                res.send('error')
                            } else {
                                if (!success) {

                                    res.send('invalid')
                                }
                                else {

                                    res.status(200).json({ 'Siteuserd': url });
                                }

                            }
                        }


                    )
                })

                resolve(url);


            });
        })
    };
    uploadPicture()



});

Siteroute.route('/update').post(authenticate, function (req, res) {
    console.log(req.body.cpr)
    Siteuserd.findByIdAndUpdate(
        { _id: req.body._id },

        {
            name: req.body.name,
            nc: req.body.nc,
            taxes: req.body.taxas,
            skill: req.body.skill,
            payrate: req.body.pr,
            cpr: req.body.cpr,
            otpayrate: req.body.otpr,
            jobn: req.body.jobn,
            phone: req.body.phone,
            address: req.body.address,
            itin: req.body.itin,
            status: req.body.status,
            client: req.body.client,
            idno: req.body.idno,
            superallow: req.body.superallow,
            supermode: req.body.supermode,
            supersite: req.body.supersite,
            email: req.body.email,
            password: req.body.password,

            clientid: req.body.clientid,

            manageraccess: req.body.manageraccess,

            langlat: req.body.langlat

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});
Siteroute.route('/updatesupersite').post(function (req, res) {

    Siteuserd.findByIdAndUpdate(
        { _id: req.body._id },

        {
            supersite: req.body.supersite,


        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});


Siteroute.route('/notify').post(function (req, res) {
    console.log(req.body.cpr)
    Siteuserd.findByIdAndUpdate(
        { _id: req.body.id },

        {
            notification: 'false',


        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/pass').post(function (req, res) {
    Siteuserd.findOneAndUpdate(
        { email: req.body.email },

        {

            password: req.body.password

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/updatebulk').post(authenticate, function (req, res) {
    const objectToUpdate = req.body.preparedata.map(eachObj => {
        return {
            updateOne: {
                filter: { name: eachObj.Employee },
                update: { wages: eachObj.net }
            }
        }
    })
    Siteuserd.bulkWrite(objectToUpdate,
        { ordered: false },
        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }
    )

});

Siteroute.route('/updatefromuser').post(function (req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id: req.body._id },

        {
            name: req.body.name,
            skill: req.body.skill,
            phone: req.body.phone,
            status: req.body.status,

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/profilechange').post(function (req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id: req.body._id },

        {
            imgurl: req.body.imgurl

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/originalphoto').post(authenticate, function (req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id: req.body._id },

        {
            imgurl2: req.body.imgurl

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/updatestatus').post(function (req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id: req.body._id },

        {
            login: req.body.login,
        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});
Siteroute.route('/adduser').post(authenticate, function (req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body.sender }, function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.contacts.find(contact => contact.userid === req.body.user);
            if (existingContact) {
                // Update the existing contact
                existingContact.unseen += req.body.unseen;
                existingContact.timestamp = Date.now();
                existingContact.usertype = 'user';

                existingContact.msg = req.body.msg;
            } else {
                // Push a new contact
                admin.contacts.push({
                    userid: req.body.user,
                    unseen: req.body.unseen,
                    usertype: 'user',
                    msg: req.body.msg
                });
            }

            // Save the updated "Admin" document
            admin.save(function (error2, success2) {
                if (error2) {
                    console.log(error2);
                    res.send('error2');
                } else {
                    res.status(200).json({ 'Client': success2 });
                }
            });
        }
    });
});
Siteroute.route('/deleteusercontact').post(authenticate, function (req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate({ _id: req.body._id },
        { $pull: { contacts: { userid: { $in: req.body.ids } } } },
        function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        }  else {
            // Check if the contact exists in the "contacts" array

            // Save the updated "Admin" document
            res.status(200).send('Array objects deleted');

        }
    });
});
const getEquallySpacedIndexes = (length) => {
    // Calculate the step size to ensure that we have 10 equally spaced indexes
    const step = Math.max(Math.floor(length / 10), 1);

    // Initialize an array to store the selected indexes
    const indexes = [];

    // Push the first index
    indexes.push(0);

    // Push the equally spaced indexes
    for (let i = step; i < length; i += step) {
        indexes.push(i);
    }

    // Push the last index
    indexes.push(length - 1);

    return indexes;
};
Siteroute.route('/travel').post(authenticate, function (req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body._id }, async function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.travel.find(contact => (contact.date === req.body.date && contact.end === '-'));
            console.log(existingContact)
            if (existingContact && req.body.coords) {

                if (req.body.coords && req.body.coords.length !== 2000) {
                    existingContact.end = req.body.end;
                }




                if (req.body.coords.length >= 10) {
                    existingContact.coords = [...req.body.coords, ...existingContact.coords];
                    const cf = getEquallySpacedIndexes(req.body.coords.length).map(index => req.body.coords[index]);

                    console.log('sd12321321')
                    console.log(cf)
                    https.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${cf.join(';')}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g`, (resq) => {
                        let data = '';

                        resq.on('data', (chunk) => {
                            data += chunk;
                        });

                        resq.on('end', () => {
                            console.log(JSON.parse(data));
                            var dat = JSON.parse(data)
                            // Extract total distance in meters from the API response
                            const totalDistanceMeters = dat.routes[0].distance;

                            // Convert distance from meters to miles
                            const totalDistanceMiles = totalDistanceMeters / 1609.34; // 1 meter ≈ 0.000621371 miles
                            existingContact.distance = totalDistanceMiles;
                            // Save the updated "Admin" document
                            admin.save(function (error2, success2) {
                                if (error2) {

                                    res.send('error2');
                                } else {
                                    res.status(200).json({ 'Client': success2 });
                                }
                            });
                            // Process the received data here
                        });
                    }).on('error', (error) => {
                        console.error(`Error: ${error.message}`);
                    });

                }
                else {
                    existingContact.distance = '0';
                    // Save the updated "Admin" document
                    admin.save(function (error2, success2) {
                        if (error2) {

                            res.send('error2');
                        } else {
                            res.status(200).json({ 'Client': success2 });
                        }
                    });

                }




            } else {
                // Push a new contact
                admin.travel.push({
                    coords: [],
                    date: req.body.date,
                    start: req.body.start,
                    end: '-',
                    distance: '0',


                });
                // Save the updated "Admin" document
                admin.save(function (error2, success2) {
                    if (error2) {

                        res.send('error2');
                    } else {
                        res.status(200).json({ 'Client': success2 });
                    }
                });
            }
            // Push a new contact




        }
    });
});
Siteroute.route('/updatetravel').post(authenticate, function (req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body._id }, async function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.travel.find(contact => (contact.date === req.body.val.date && contact.end === req.body.val.end));
            console.log(existingContact)
            if (existingContact && req.body.val.coords) {





                if (req.body.val.coords.length >= 10) {

                    const cf = getEquallySpacedIndexes(req.body.val.coords.length).map(index => req.body.val.coords[index]);
                    console.log('sd12321321')
                    console.log(cf)
                    https.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${cf.join(';')}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g`, (resw) => {
                        let data = '';

                        resw.on('data', (chunk) => {
                            data += chunk;
                        });

                        resw.on('end', () => {
                            var dat = JSON.parse(data)
                            console.log(dat)
                            // Extract total distance in meters from the API response
                            const totalDistanceMeters = dat.routes[0].distance;

                            // Convert distance from meters to miles
                            const totalDistanceMiles = totalDistanceMeters / 1609.34; // 1 meter ≈ 0.000621371 miles
                            console.log(totalDistanceMiles)
                            existingContact.distance = totalDistanceMiles;

                            // Save the updated "Admin" document
                            admin.save(function (error2, success2) {
                                if (error2) {

                                    res.send('error2');
                                } else {
                                    res.status(200).json({ 'Client': success2 });
                                }
                            });
                            // Process the received dat here
                        });
                    }).on('error', (error) => {
                        console.error(`Error: ${error.message}`);
                    });

                }
                else {
                    existingContact.distance = 0;
                    // Save the updated "Admin" document
                    admin.save(function (error2, success2) {
                        if (error2) {

                            res.send('error2');
                        } else {
                            res.status(200).json({ 'Client': success2 });
                        }
                    });
                }




            }


            // Push a new contact




        }
    });
});
Siteroute.route('/updatetravelmiles').post(authenticate, function (req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body._id }, async function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.travel.find(contact => (contact.date === req.body.val.date && contact.end === req.body.val.end));
            console.log(existingContact)
            if (existingContact) {




                existingContact.distance = req.body.distance;

                // Save the updated "Admin" document
                admin.save(function (error2, success2) {
                    if (error2) {

                        res.send('error2');
                    } else {
                        res.status(200).json({ 'Client': success2 });
                    }
                });




            }


            // Push a new contact




        }
    });
});
Siteroute.route('/findtravel').post(function (req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body._id }, function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.travel.find(contact => (contact.date === req.body.date && contact.end === '-'));
            if (existingContact) {
                // Update the existing contact

                res.status(200).json({ 'travellog': true });
            } else {
                res.status(200).json({ 'travellog': false });
            }
            // Push a new contact



            // Save the updated "Admin" document

        }
    });
});

Siteroute.route('/viewed').post(function (req, res) {
    Siteuserd.findOne({ _id: req.body.sender }, function (error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.contacts.find(contact => contact.userid === req.body.user);
            if (existingContact) {
                // Update the existing contact
                existingContact.unseen = 0;
            } else {
                // Push a new contact
                admin.contacts.push({
                    userid: req.body.user,
                    unseen: req.body.unseen,
                });
            }

            // Save the updated "Admin" document
            admin.save(function (error2, success2) {
                if (error2) {
                    console.log(error2);
                    res.send('error2');
                } else {
                    res.status(200).json({ 'Client': success2 });
                }
            });
        }
    });
});
Siteroute.route('/getdistance').post(authenticate, function (req, res) {
    const parseDate = (dateString) => {
        const [month, day, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };
    const parseDate2 = (dateString) => {
        const [month, day, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };
    // Function to get all the dates of the week for a given date


    // Function to get all the dates of the week starting from Monday for a given date
    const getWeekDates = (date) => {
        const weekStart = new Date(date);
        const dayOfWeek = weekStart.getDay(); // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
        const diff = weekStart.getDate() - dayOfWeek + 1 + (dayOfWeek === 0 ? -6 : 1); // Calculate the difference to the first day (Monday) of the week
        weekStart.setDate(diff);

        const weekEnd = new Date(weekStart + 1);
        weekEnd.setDate(weekEnd.getDate() + 6); // Set to the last day (Sunday) of the week

        const datesOfWeek = [];
        let currentDate = new Date(weekStart);
        while (currentDate <= weekEnd) {
            datesOfWeek.push(currentDate.toISOString().split('T')[0]); // Store date in 'yyyy-mm-dd' format
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesOfWeek;
    };

    const { users } = req.body; // Extracting 'users' array from the request body
    const dateweek = parseDate(req.body.weekend)

    // Extracting user IDs from the 'users' array
    const userIds = users.map(user => user.id);
    // Find users whose IDs are in the array
    var dates = getWeekDates(dateweek).map(user => user.toString())
    console.log(dates)
    Siteuserd.find({ _id: { $in: userIds } }, function (error, foundUsers) {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        // Handle the case where no users are found
        if (!foundUsers || foundUsers.length === 0) {
            return res.status(404).send('No users found');
        }

        var miles = []
        foundUsers.forEach(element => {
            var totalDistance = 0
            var dailymiles = []

            element.travel.forEach(item => {
                if (item && item.date) {

                    var date1 = parseDate(item.date).toISOString().split('T')[0]


                    var found = dates.includes(date1)

                    if (found) {
                        if (item.distance) {
                            console.log(item.distance)
                            totalDistance = totalDistance + Number(item.distance)
                            dailymiles.push(item.distance)
                        }
                    }



                }

            });
            console.log(element.name)
            console.log(totalDistance)
            miles.push({
                userid: element._id,
                miles: totalDistance,
                dailymiles: dailymiles
            })
        });


        // Do something with the found users, such as sending them back in the response
        res.status(200).json(miles);
    });



});
Siteroute.route('/add').post( authenticate, function (req, res) {



    Siteuserd.find(
        {
            email: req.body.email,
        },
        function (error, success) {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'An error occurred' });
            } else {
                if (success.length === 0) {
                    let Siteuserds = new Siteuserd(req.body);
                    Siteuserds.save()
                        .then(Siteuserd => {
                            console.log('created')
                            res.status(200).json({ 'Siteuserd': 'Siteuserd added successfully' });
                        })
                        .catch(err => {
                            console.log("erer")
                        });

                } else {
                    console.log('created3')
                    res.status(200).json({ 'Siteuserd': 'user exist' });
                }
            }
        }
    );
});
Siteroute.route('/addinactive').post( authenticate, function (req, res) {



    Siteuserd.find(
        {
            email: req.body.email,
        },
        function (error, success) {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'An error occurred' });
            } else {
                if (success.length === 0) {
                    let Siteuserds = new Siteuserd(req.body);
                    Siteuserds.save()
                        .then(Siteuserd => {
                            console.log('created')
                            res.status(200).json({ 'Siteuserd': 'Siteuserd added successfully' });
                        })
                        .catch(err => {
                            console.log("erer")
                        });

                } else {
                    console.log('created3')
                    res.status(200).json({ 'Siteuserd': 'user exist' });
                }
            }
        }
    );
});


Siteroute.route('/getall').get(authenticate, function (req, res) {

    Siteuserd.find(
        {},



        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )
});


Siteroute.route('/inactive').get(function (req, res) {

    Siteuserd.find(
        {
            status: 'Inactive'
        },



        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )
});



Siteroute.route('/active').get(authenticate, function (req, res) {

    Siteuserd.find(
        {
            status: 'Active'
        },



        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )
});


// Function to parse date string in format mm/dd/yyyy and return a Date object
function parseDate(dateString) {
    const [month, day, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}

// Function to get the last Sunday before a given date
function getLastSunday(date) {
    const dayOfWeek = date.getDay(); // Day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const lastSunday = new Date(date); // Clone the date object
    lastSunday.setDate(date.getDate() - dayOfWeek); // Move to the last Sunday
    return lastSunday;
}

// Function to get the coming Sunday after a given date
function getComingSunday(date) {
    const dayOfWeek = date.getDay(); // Day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const daysUntilSunday = 7 - dayOfWeek; // Calculate days until Sunday
    const comingSunday = new Date(date); // Clone the date object
    comingSunday.setDate(date.getDate() + daysUntilSunday); // Move to the coming Sunday
    return comingSunday;
}


Siteroute.route('/find').post(authenticate, function (req, res) {
    Siteuserd.find(
        { _id: req.body.Siteuserd_id },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {


                    var hrstoupdate = success
                    if (hrstoupdate[0].hrsdetails.length > 0) {
                        var hrt = hrstoupdate[0].hrsdetails
                        var hreligible = []
                        hrt.forEach(element => {

                            const currentDate = new Date();

                            const otherDate = parseDate(element.hrsweekend);
                            const lastSunday = getLastSunday(currentDate);
                            const comingSunday = getComingSunday(currentDate);
                            console.log(currentDate)
                            console.log(lastSunday)

                            console.log(comingSunday)


                            if (otherDate > lastSunday && otherDate <= comingSunday) {
                                console.log(element)
                                hreligible.push(element)
                            }

                        });
                        console.log(hreligible)
                        hrstoupdate[0].hrsdetails = hreligible

                        console.log(hrstoupdate[0].hrsdetails)
                        res.status(200).json({ 'Siteuserd': hrstoupdate });


                    }
                    else {

                        res.status(200).json({ 'Siteuserd': hrstoupdate });
                    }
                }

            }
        }


    )



});
Siteroute.route('/findmobilehome').post(authenticate, function (req, res) {
    const projection = { travel: 0 ,addedusers:0}; // Exclude 'password' field

    Siteuserd.find(
        { _id: req.body.Siteuserd_id },
        projection,

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {


                    var hrstoupdate = success
                  
                    res.status(200).json({ 'Siteuserd': hrstoupdate });
                }

            }
        }


    )



});
Siteroute.route('/superbycom').post(function (req, res) {
    Siteuserd.find(
        {
            _id: req.body.id
        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {
                    Siteuserd.find({
                        supermode: 'true',
                        clientid: success[0].clientid
                    }, function (error2, success2) {
                        if (error2) {
                            res.send('error')
                        } else {
                            if (!success2) {

                                res.send('invalid')
                            }
                            else {

                                console.log(success)
                                res.status(200).json({ 'Siteuserd': success2 });
                            }

                        }
                    })
                }

            }
        }


    )



});
Siteroute.route('/super').get(function (req, res) {

    Siteuserd.find(
        { supermode: 'true' },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {
                    console.log(success)
                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});


Siteroute.route('/findone').post(function (req, res) {
    Siteuserd.findOne(
        { _id: req.body.Siteuserd_id },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});
Siteroute.route('/findbycompany').post(function (req, res) {
console.log(req.body)
Client.find(
    {
        _id: new ObjectId(req.body.clientid),
      adminrights:'Allowed',
      
    },

    function (error3, success3) {
        if (error3) {
            res.send('error')
        } else {
            if (!success3||success3.length===0) {
                Client.find(
                    {
                      adminrights:'Allowed',
                      
                    },
            
                    function (error2, success2) {
                        if (error2) {
                            res.send('error')
                        } else {
                            if (!success2) {
            
                                Siteuserd.find(
                                    { clientid:req.body.clientid },
                            
                                    function (error, success) {
                                        if (error) {
                                            res.send('error')
                                        } else {
                                            if (!success) {
                            
                                                res.send('invalid')
                                            }
                                            else {
                                              
                                                res.status(200).json({ 'Siteuserd': success });
                                            }
                            
                                        }
                                    }
                            
                            
                                )
                            }
                            else {
                                var clientids=[]
                                
            
                      success2.forEach(element => {
                                if(element._id=== req.body.clientid)
                                {
                                   
                                
                                }
                                    else{
            
                                        clientids.push(element._id)                        }
                                })
                                clientids.push(req.body.clientid)
                                
                              
            
                                Siteuserd.find(
                                    { clientid:{$in: clientids},status:'Active' },
                            
                                    function (error, success) {
                                        if (error) {
                                            res.send('error')
                                        } else {
                                            if (!success) {
                            
                                                res.send('invalid')
                                            }
                                            else {
                                                console.log(clientids)
                                                console.log(success)
                                                res.status(200).json({ 'Siteuserd': success });
                                            }
                            
                                        }
                                    }
                            
                            
                                )
                            }
            
                        }
                    }
            
            
                )
               
            }
            else {
                Siteuserd.find(
                    { status:'Active'},
            
                    function (error, success) {
                        if (error) {
                            res.send('error')
                        } else {
                            if (!success) {
            
                                res.send('invalid')
                            }
                            else {
                                console.log(success3)
                                res.status(200).json({ 'Siteuserd': success });
                            }
            
                        }
                    }
            
            
                )
            }

        }
    }


)





});
Siteroute.route('/findbycompanynotes').post(function (req, res) {
    console.log(req.body)
    const projection={travel:0}
    Client.find(
        {
            _id: new ObjectId(req.body.clientid),
          adminrights:'Allowed',
          
        },
        projection,
    
        function (error3, success3) {
            if (error3) {
                res.send('error')
            } else {
                if (!success3||success3.length===0) {
                    Client.find(
                        {
                          adminrights:'Allowed',
                          
                        },
                
                        function (error2, success2) {
                            if (error2) {
                                res.send('error')
                            } else {
                                if (!success2) {
                
                                    Siteuserd.find(
                                        { clientid:req.body.clientid },
                                        projection,
                                
                                        function (error, success) {
                                            if (error) {
                                                res.send('error')
                                            } else {
                                                if (!success) {
                                
                                                    res.send('invalid')
                                                }
                                                else {
                                                  
                                                    res.status(200).json({ 'Siteuserd': success });
                                                }
                                
                                            }
                                        }
                                
                                
                                    )
                                }
                                else {
                                    var clientids=[]
                                    
                
                          success2.forEach(element => {
                                    if(element._id=== req.body.clientid)
                                    {
                                       
                                    
                                    }
                                        else{
                
                                            clientids.push(element._id)                        }
                                    })
                                    clientids.push(req.body.clientid)
                                    
                                  
                
                                    Siteuserd.find(
                                        { clientid:{$in: clientids},status:'Active' },
                                projection,
                                        function (error, success) {
                                            if (error) {
                                                res.send('error')
                                            } else {
                                                if (!success) {
                                
                                                    res.send('invalid')
                                                }
                                                else {
                                                    console.log(clientids)
                                                    console.log(success)
                                                    res.status(200).json({ 'Siteuserd': success });
                                                }
                                
                                            }
                                        }
                                
                                
                                    )
                                }
                
                            }
                        }
                
                
                    )
                   
                }
                else {
                    Siteuserd.find(
                        { status:'Active'},
                        projection,
                
                        function (error, success) {
                            if (error) {
                                res.send('error')
                            } else {
                                if (!success) {
                
                                    res.send('invalid')
                                }
                                else {
                                    console.log(success3)
                                    res.status(200).json({ 'Siteuserd': success });
                                }
                
                            }
                        }
                
                
                    )
                }
    
            }
        }
    
    
    )
    
    
    
    
    
    });
Siteroute.route('/findbyname').post(function (req, res) {

    Siteuserd.find(
        { name: req.body.name },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});
Siteroute.route('/findimg').post(authenticate, function (req, res) {

    Siteuserd.findOne(
        { _id: req.body.id },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success.imgurl ? success.imgurl : success.imgurl2 ? success.imgurl2 : 'not' });
                }

            }
        }


    )



});

Siteroute.route('/login').post(function (req, res) {
    Siteuserd.find(
        {
            email: req.body.email,
            password: req.body.password,
            status: 'Active'
        },

        function (error, success) {
            if (error) {

                console.log(error)
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {
                    console.log(success)

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});
Siteroute.route('/verifypass').post(function (req, res) {
    Siteuserd.findOne(
        {
            _id: req.body.id,
        },

        function (error, success) {
            if (error) {

                console.log(error)
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {
                    console.log(success)
                    if(req.body.password===success.password){

                        res.status(200).json({ 'Siteuserd': 'valid' });
                    }
                    else{

                        res.status(200).json({ 'Siteuserd': 'invalid' });
                    }

                }

            }
        }


    )



});

Siteroute.route('/reset').post(function (req, res) {
    console.log(req.body)

    Siteuserd.find(
        {
            email: req.body.email
        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {
                    if (success.length > 0) {
                        console.log(success)

                        Email.findOne(
                            {},



                            function (error, result) {
                                if (error) {
                                    res.send('error')
                                } else {
                                    if (!result) {

                                        res.send('invalid')
                                    }
                                    else {
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: result.email,
                                                pass: result.pass
                                            }
                                        });



                                        const mailOptions = {
                                            from: 'Password Reset', // sender address
                                            to: req.body.email, // list of receivers
                                            subject: `Password Reset`, // Subject line
                                            html: `<h1>Your Otp for password reset is  ${req.body.otp}.</h1>`// plain text body
                                        };


                                        transporter.sendMail(mailOptions, function (err, info) {
                                            if (err) {
                                                console.log(err)
                                                res.status(200).json({ 'Siteuserd': 'fail' });
                                            }
                                            else {
                                                console.log(info);

                                                res.status(200).json({ 'Siteuserd': 'emailok' });
                                            }
                                        })
                                        console.log(result)

                                    }

                                }
                            }


                        )

                    }
                    else {

                        res.status(200).json({ 'Siteuserd': 'fail' });
                    }

                }

            }
        }


    )



});

Siteroute.route('/delete').post(authenticate, function (req, res) {
    console.log(req.body)
    var ids = req.body.ids
    Siteuserd.deleteMany(
        { _id: { $in: ids } },

        function (error, success) {
            if (error) {
                res.send(error)
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/addchat').post(authenticate, function (req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id: req.body._id },

        {
            $push: {
                addedusers: {
                    userid: req.body.userid,
                    role: req.body.role,
                    username: req.body.name,
                    status: req.body.status

                }
            }

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {
                    console.log(success)
                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});

Siteroute.route('/switchdrive').post( function (req, res) {
    console.log(req.body.drivingmode)
    Siteuserd.findOneAndUpdate(
        { _id: req.body._id },

        {
           drivingmode:req.body.drivingmode

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {
                    console.log(success)
                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});


Siteroute.route('/updatelinkedsites').post(function (req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id: req.body._id },

        {
            $push: {
                linkedsites: {
                    projectid: req.body.pid
                }
            }

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'User': success });
                }

            }
        }


    )



});

Siteroute.route('/updateuserprofile').post(function (req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id: req.body._id },

        {
            $push: {
                ids: {
                    idname: req.body.id,
                    idurl: req.body.idurl
                }
            }

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'User': success });
                }

            }
        }


    )



});
Siteroute.route('/removecert').post(function (req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id: req.body._id },

        {
            $pull: {
                ids: {
                    front: req.body.idurl
                }
            }

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'User': 'deleted' });
                }

            }
        }


    )



});

Siteroute.route('/updatecpr2').get(function (req, res) {

    Siteuserd.updateMany(



        {
            $set: { cpr: 5 },
            // Add the field if it doesn't exist
        },
        {

            new: true
        }


        ,

        function (error, success) {
            if (error) {
                console.log(error)
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'User': success });
                }

            }
        }


    )



});



Siteroute.route('/updateuserhours').post(authenticate, function (req, res) {
    var datec2 = new Date()
    var ustime2 = datec2.toLocaleString("en-US", { timeZone: "America/New_York" })

    const updateData = req.body.preparedata;
    console.log(req.body)
    // Create an array of update operations
    const updateOperations = updateData.map(item => ({
        updateOne: {
            filter: { _id: item.userid }, // Assuming your ID field is named _id
            update: { $set: { hrs: Number(item.Hrs) + Number(item.Ot_Hrs), hrsweek: ustime2.split(',')[0] } },
            upsert: false, // Set to true if you want to insert a new document if the ID doesn't exist
        },
    }));

    // Use bulkWrite to execute multiple update operations
    Siteuserd.bulkWrite(updateOperations, { ordered: false }, function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating documents' });
        } else {
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: `${result.modifiedCount} documents updated successfully` });
            } else {
                res.status(200).json({ message: 'No documents were updated' });
            }
        }
    });



});
Siteroute.route('/adduserhours').post(authenticate, function (req, res) {
    var datec2 = new Date()
    var ustime2 = datec2.toLocaleString("en-US", { timeZone: "America/New_York" })

    const updateData = req.body.preparedata;
    console.log(req.body)
    // Create an array of update operations
    const updateOperations = updateData.map(item => ({
        updateOne: {
            filter: { _id: item.userid }, // Assuming your ID field is named _id
            update: {
                $push: {
                    hrsdetails:
                    {
                        hrs: Number(item.Hrs) + Number(item.Ot_Hrs),
                        hrsweekend: ustime2.split(',')[0],
                        hrsstatus: 'unpaid'
                    }
                },
                upsert: false, // Set to true if you want to insert a new document if the ID doesn't exist
            },
        }
    }));

    // Use bulkWrite to execute multiple update operations
    Siteuserd.bulkWrite(updateOperations, { ordered: false }, function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating documents' });
        } else {
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: `${result.modifiedCount} documents updated successfully` });
            } else {
                res.status(200).json({ message: 'No documents were updated' });
            }
        }
    });



});
Siteroute.route('/updatecpr').post(authenticate, function (req, res) {
    Siteuserd.findOneAndUpdate(
        { _id: req.body.id },

        {

            cprapply: req.body.cprapply

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});
Siteroute.route('/changemode').post(function (req, res) {
    Siteuserd.findOneAndUpdate(
        { _id: req.body._id },

        {

            superallow: req.body.mode

        },

        function (error, success) {
            if (error) {
                res.send('error')
            } else {
                if (!success) {

                    res.send('invalid')
                }
                else {

                    res.status(200).json({ 'Siteuserd': success });
                }

            }
        }


    )



});










module.exports = Siteroute;
