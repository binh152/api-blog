const mongoose = require('mongoose');

const sinhvienSchema = new mongoose.Schema({
    hoten:{
        type: 'String',
        required: true
    },
    ngaysinh:{
        type : 'String',
        required: false
    },
    diemTB_ky1:{
        type : 'String',
        required: false
    }
})

module.exports= mongoose.model('sinhvienSchema',sinhvienSchema)