const {validatePayment, OfflinePayment} = require("../../models/Cashier/OfflinePayment");
const {OfflineService} = require("../../models/OfflineClient/OfflineService");
const {OfflineClient} = require("../../models/OfflineClient/OfflineClient");
const {OfflineProduct} = require("../../models/OfflineClient/OfflineProduct");
const {ProductConnector} = require("../../models/Warehouse/ProductConnector");
const {Product} = require("../../models/Warehouse/Product");
const {OfflineConnector} = require("../../models/OfflineClient/OfflineConnector");
const {OfflineDiscount, validateDiscount} = require("../../models/Cashier/OfflineDiscount");
const {Clinica} = require("../../models/DirectorAndClinica/Clinica");
//Payment
module.exports.payment = async (req, res) => {
    try {
        const {payment, discount, services, products} = req.body

        // CheckPayment
        const checkPayment = validatePayment(payment).error
        if (checkPayment) {
            console.log(checkPayment)
            return res.status(400).json({
                error: error.message,
            })
        }

        // CheckDiscount
        const checkDiscount = validateDiscount(discount).error
        if (checkDiscount) {
            console.log(checkDiscount)
            return res.status(400).json({
                error: error.message,
            })
        }

        //Update Services and Products
        services && services.map(async (service) => {
            const update = await OfflineService.findByIdAndUpdate(service._id, service)

            //=========================================================
            // Product decrement
            const productconnectors = await ProductConnector.find({
                clinica: service.clinica,
                service: service.serviceid,
            })

            if (service.refuse) {
                for (const productconnector of productconnectors) {
                    const product = await Product.findById(productconnector.product)
                    product.total = product.total + productconnector.pieces * service.pieces
                    await product.save()
                }
            }

        })

        products && products.map(async (product) => {
            const update = await OfflineProduct.findByIdAndUpdate(product._id, product)

            //=========================================================
            // Product decrement
            if (product.refuse) {
                const produc = await Product.findById(product.productid)
                produc.total = produc.total + product.pieces
                await produc.save()
            }
        })

        // CreatePayment
        const newpayment = new OfflinePayment({...payment})
        await newpayment.save()

        const updateConnector = await OfflineConnector.findById(payment.connector)
        updateConnector.payments.push(newpayment._id)
        // CreateDiscount
        if (discount.discount && discount.comment.length > 5) {
            const newdiscount = new OfflineDiscount({
                ...discount,
                payment: newpayment._id
            })
            await newdiscount.save()

            newpayment.discount = newdiscount._id
            await newpayment.save()

            updateConnector.discounts.push(newdiscount._id)
        }

        await updateConnector.save()

        res.status(201).send(newpayment)
    } catch (error) {
        console.log(error)
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

//Clients getall
module.exports.getAll = async (req, res) => {
    try {
        const {clinica, beginDay, endDay} = req.body
        const clinic = await Clinica.findById(clinica)

        if (!clinic) {
            return res.status(400).json({
                message: "Diqqat! Klinika ma'lumotlari topilmadi.",
            })
        }

        const connectors = await OfflineConnector.find({
            clinica,
            createdAt: {
                $gte: beginDay,
                $lt: endDay,
            },
        })
            .populate('client', '-createdAt -updatedAt -isArchive -__v')
            .populate('services')
            .populate('products')
            .populate("payments")
            .populate("discounts")
            .sort({_id: -1})

        res.status(200).send(connectors)
    } catch (error) {
        console.log(error)
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}
