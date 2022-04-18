export const checkData = (totalpayment, payment, discount) => {
    console.log(parseInt(payment.payment) + parseInt(payment.debt) + parseInt(discount.discount))
    if (totalpayment !== parseInt(payment.payment) + parseInt(payment.debt) + parseInt(discount.discount)
    ) {
        return {
            title: "Diqqat! To'lov summasida xatolik yuz berdi.",
            description: "Iltimos to'lov summalarini qayta ko'rib chiqing.",
            status: 'error',
        }
    }


    return false
}
