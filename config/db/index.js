const mongoose = require('mongoose');

async function connect () {
    mongoose.connect('mongodb+srv://ngochuongtr1975:Amcc0123@hugoaudio.xkpthfo.mongodb.net/HugoAudio?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
        .catch(err => console.log('>>>>>>>>> DB Error: ', err));
}

module.exports = {connect};

