const {Schema, model, Types} = require('mongoose')
const Joi = require('joi')

const discount = new Schema(
    {
        total: {type: Number, required: true},
        disount: {type: Number, required: true},
        services: {type: Schema.Types.ObjectId, ref: 'Service', required: true},
        products: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        payment: {type: Schema.Types.ObjectId, ref: 'Payment'},
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
        discount: Joi.number().required(),
        payment: Joi.string().required(),
        clinica: Joi.string().required(),
        connector: Joi.string().required(),
        client: Joi.string().required(),
        services: Joi.array(),
        products: Joi.array(),
        comment: Joi.string().required(),
    })

    return schema.validate(discount)
}

module.exports.validateDiscount = validateDiscount
module.exports.Discount = model('Discount', discount)
