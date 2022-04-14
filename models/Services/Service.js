const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const service = new Schema(
  {
    name: { type: String, required: true },
    shortname: { type: String },
    price: { type: Number, required: true },  
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    servicetype: { type: Schema.Types.ObjectId, ref: "ServiceType" },
    clinica: { type: Schema.Types.ObjectId, ref: "Clinica", required: true },
    tables: [{ type: Schema.Types.ObjectId, ref: "Table" }],
    templates: [{ type: Schema.Types.ObjectId, ref: "Template" }],
    productconnectors: [{ type: Schema.Types.ObjectId, ref: "ProductConnector" }],
    doctorProcient: { type: Number },
    counterAgentProcient: { type: Number },
    counterDoctorProcient: { type: Number },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateService(service) {
  const schema = Joi.object({
    name: Joi.string().required(),
    shortname: Joi.string(),
    price: Joi.number().required(),
    department: Joi.string().required(),
    servicetype: Joi.string(),
    clinica: Joi.string().required(),
    doctorProcient: Joi.number(),
    counterAgentProcient: Joi.number(),
    counterDoctorProcient: Joi.number(),
  });

  return schema.validate(service);
}

module.exports.validateService = validateService;
module.exports.Service = model("Service", service);
