module.exports = {
    startmsg() {
        console.log(`Bot has been started...`)
    },
    TOKEN: `1172794219:AAH6OjXfr0Wgo03Zz-5QJjt34TYtyF2WGCo`,
    db(kind) {
        const mongoose = require('mongoose');
        if (kind) {
            mongoose.connect('mongodb+srv://root:ebegar84@cluster0.14rxf.mongodb.net/TELEGRAMDATINGBOT?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        } else {
            mongoose.disconnect();
        }
    }
}