var admin = require("firebase-admin");
var serviceAccount = require("./itirich-9f745-firebase-adminsdk-wnr9w-026f59fe64.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://itirich-9f745.firebaseio.com",
    projectId: "itirich-9f745",
    messagingSenderId: "320875232142"
});

exports.notification = function () {
    return function (req, res, next) {
        let token_notis = []
        for (let i = 0; i < req.user_noti.length; i++) {
            if (req.user_noti[i].cate) {
                let cate_query = JSON.parse(req.user_noti[i].cate)
                let cate = JSON.parse(req.body.cate)
                if ((cate.less20000 && cate_query.less20000 === cate.less20000)
                    || (cate.less50000 && cate_query.less50000 === cate.less50000)
                    || (cate.less100000 && cate_query.less100000 === cate.less100000)
                    || (cate.more100000 && cate_query.more100000 === cate.more100000)
                    || (cate.less20_percent && cate_query.less20_percent === cate.less20_percent)
                    || (cate.more20_percent && cate_query.more20_percent === cate.more20_percent)) {
                    console.log(req.user_noti[i].noti_token)

                    token_notis.push(req.user_noti[i].noti_token)
                }
            }
        }

        if (token_notis.length > 0) {
            var payload = {
                notification: {
                    title: "อัพเดตข่าวสาร " + req.body.title,
                    body: req.body.title,
                    sound: "default"
                    //body: "ประชุม"
                }
            };
            var options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
            admin.messaging().sendToDevice(token_notis, payload)
                .then(function (response) {
                    console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                    console.log("Error sending message:", error);
                });

            next()
        } else {
            next()
        }
    }
}