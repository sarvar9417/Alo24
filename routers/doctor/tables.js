const {TableColumn, validateTableColumn} = require("../../models/Services/TableColumn");
const {Service} = require("../../models/Services/Service");
const {ServiceTable, validateServiceTable} = require("../../models/Services/ServiceTable");
const {ObjectId} = require("mongodb");
module.exports.column = async (req, res) => {
    try {
        const {column} = req.body
        if (column._id) {
            await TableColumn.findByIdAndUpdate(column._id, {...column})
            return res.status(200).send(update)
        } else {
            const newColumn = new TableColumn({...column})
            await newColumn.save()

            const update = await Service.findByIdAndUpdate(column.service, {
                column: newColumn._id
            })
            return res.status(200).send(newColumn)

        }

    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

module.exports.table = async (req, res) => {
    try {
        const {table} = req.body
        if (table._id) {
            const update = await ServiceTable.findByIdAndUpdate(table._id, {...table})
            return res.status(200).send(update)
        } else {
            const newTable = new ServiceTable({...table})
            await newTable.save()
            const update = await Service.findByIdAndUpdate(table.service, {
                $push: {
                    tables: new ObjectId(newTable._id),
                }
            })
            return res.status(200).send(newTable)

        }

    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}