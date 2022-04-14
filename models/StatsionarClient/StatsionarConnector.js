const {Schema, model, Types} = require('mongoose')
const Joi = require('joi')

const connector = new Schema(
    {
        clinica: {type: Schema.Types.ObjectId, ref: 'Clinica', required: true},
        isArchive: {type: Boolean, default: false},
        client: {
            type: Schema.Types.ObjectId,
            ref: 'StatsionarClient',
            required: true,
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reseption: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        services: [
            {
                type: Schema.Types.ObjectId,
                ref: 'StatsionarService',
                required: true,
            },
        ],
        products: [{type: Schema.Types.ObjectId, ref: 'StatsionarProduct'}],
        accept: {type: Boolean, default: false},
        totalprice: {type: Number},
        dailys: [
            {
                type: Schema.Types.ObjectId,
                ref: 'StatsionarDaily',
            },
        ],
        room: {
            type: Schema.Types.ObjectId,
            ref: 'StatsionarRoom',
        },
        diagnosis: {type: String}

        // payment: { type: Schema.Types.ObjectId, ref: 'StatsionarProduct' } // To'lovlarni qabul qilingan Idsi kiritiladi
    },
    {
        timestamps: true,
    },
)

function validateStatsionarConnector(connector) {
    const schema = Joi.object({
        clinica: Joi.string().required(),
        client: Joi.string(),
        doctor: Joi.string(),
        services: Joi.string(),
        products: Joi.string(),
        accept: Joi.boolean(),
        totalprice: Joi.number(),
        room: Joi.string(),
        probirka: Joi.number(),
        reseption: Joi.string(),
        diagnosis: Joi.string()
    })

    return schema.validate(connector)
}

module.exports.validateStatsionarConnector = validateStatsionarConnector
module.exports.StatsionarConnector = model('StatsionarConnector', connector)
