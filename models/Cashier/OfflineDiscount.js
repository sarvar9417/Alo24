const {Schema, model, Types} = require('mongoose')
const Joi = require('joi')

const offlineDiscount = new Schema(
    {
        total: {type: Number, required: true},
        discount: {type: Number, required: true},
        procient: {type: Number, max: 100},
        services: [{type: Schema.Types.ObjectId, ref: 'Service', required: true}],
        products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}],
        payment: {type: Schema.Types.ObjectId, ref: 'Payment', required: true},
        clinica: {type: Schema.Types.ObjectId, ref: 'Clinica', required: true},
        client: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
        connector: {type: Schema.Types.ObjectId, ref: 'Connector', required: true},
        isArchive: {type: Boolean, default: false},
        comment: {type: String, required: true},
    },
    {
        timestamps: true,
    },
)

function validateDiscount(discount) {
    const schema = Joi.object({
        total: Joi.number().required(),
        discount: Joi.number(),
        procient: Joi.number(),
        payment: Joi.string(),
        clinica: Joi.string().required(),
        connector: Joi.string().required(),
        client: Joi.string().required(),
        services: Joi.array(),
        products: Joi.array(),
        comment: Joi.string(),
    })
    return schema.validate(discount)
}

module.exports.validateDiscount = validateDiscount
module.exports.OfflineDiscount = model('OfflineDiscount', offlineDiscount)
