export const checkData = (payment, payments, discount, discounts, services, products) => {
    let summ = 0
    for (const service of services) {
        if (!service.refuse && !service.payment) {
            return `Diqqat! Iltimos ${service.service.name} xizamtini xizmatlar ro'txatidan o'chiring yoki qo'shing.`
        }
        summ += service.service.price * service.pieces
    }

    for (const product of products) {
        if (!product.refuse && !product.payment) {
            return `Diqqat! Iltimos ${product.product.name} mahsulotini mahsulotlar ro'txatidan o'chiring yoki qo'shing.`
        }
        summ += product.product.price * product.pieces
    }
    console.log(parseInt(payment.payment))
    if (summ !==
        parseInt(payments) + parseInt(discounts) + parseInt(payment.payment) + parseInt(payment.debt) + parseInt(discount.discount)
    ) {
        return {
            title: "Diqqat! To'lov summasida xatolik yuz berdi.",
            description: "Iltimos to'lov summalarini qayta ko'rib chiqing.",
            status: 'error',
        }
    }


    return false
}
