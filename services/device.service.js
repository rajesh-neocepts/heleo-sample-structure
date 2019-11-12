var deviceRepository = require('../db/repositories/DeviceRepository');
var models = require('../db/models/index');
module.exports = {
    createDevice(deviceName, ipAddress, macAddress,callback) {
        var sql = deviceRepository.create_device(deviceName, ipAddress, macAddress);
        // models.Devices.create({ deviceName: deviceName, ipAddress:ipAddress, macAddress: macAddress}, function(err) {
        //     return callback("Error in save",null);
        // });
        models.sequelize.query(sql,{ replacements: [deviceName,ipAddress,macAddress], type: models.sequelize.QueryTypes.INSERT}).then(([results, metadata]) => {
            if(!results){

                return callback("Error in save",null)
            }else{

                return callback(null,results);
            }
        })       
    },
    updateDevice() {
        deviceRepository.update_device();
        return 0;
    },
    deleteDevice() {
        deviceRepository.delete_device();
        return 0;
    },
    listDevices(cb) {
        models.Devices.findAll().then(devices => {
            if (devices) {
                return cb(null, devices);
            } else {
                return cb("Error: getting the device.", null);
            }
        });
    },
    getDeviceById(deviceId, cb) {
        models.Devices.findAll({ where: { id: deviceId } }).then(device => {
            if (device) {
                return cb(null, device);
            } else {
                return cb("Error: getting the device.", null);
            }
        });

    }
}