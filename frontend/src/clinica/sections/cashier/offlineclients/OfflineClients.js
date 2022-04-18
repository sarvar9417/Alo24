import {useToast} from "@chakra-ui/react";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
// import { Modal } from "../components/Modal";
import {RegisterClient} from "./clientComponents/RegisterClient";
import {TableClients} from "./clientComponents/TableClients";
import {checkData} from "./checkData/checkData";
// import {
//   checkClientData,
//   checkProductsData,
//   checkServicesData,
// } from "./checkData/checkData";
// import { CheckModal } from "../components/ModalCheck";

export const OfflineClients = () => {
    const [beginDay, setBeginDay] = useState(
        new Date(new Date().setUTCHours(0, 0, 0, 0))
    );
    const [endDay, setEndDay] = useState(
        new Date(new Date().setDate(new Date().getDate() + 1))
    );
    //====================================================================
    //====================================================================
    // MODAL
    // const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // RegisterPage
    const [visible, setVisible] = useState(false);

    const changeVisible = () => setVisible(!visible);

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [countPage, setCountPage] = useState(10);

    const indexLastConnector = (currentPage + 1) * countPage;
    const indexFirstConnector = indexLastConnector - countPage;
    const [currentConnectors, setCurrentConnectors] = useState([]);

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const toast = useToast();

    const notify = useCallback(
        (data) => {
            toast({
                title: data.title && data.title,
                description: data.description && data.description,
                status: data.status && data.status,
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        },
        [toast]
    );
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const {request, loading} = useHttp();
    const auth = useContext(AuthContext);

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // getConnectors
    const [connectors, setConnectors] = useState([]);
    const [searchStorage, setSearchStrorage] = useState([]);

    const getConnectors = useCallback(
        async (beginDay, endDay) => {
            try {
                const data = await request(
                    `/api/cashier/offline/getall`,
                    "POST",
                    {clinica: auth && auth.clinica._id, beginDay, endDay},
                    {
                        Authorization: `Bearer ${auth.token}`,
                    }
                );
                setConnectors(data);
                setSearchStrorage(data);
                setCurrentConnectors(
                    data.slice(indexFirstConnector, indexLastConnector)
                );
            } catch (error) {
                notify({
                    title: error,
                    description: "",
                    status: "error",
                });
            }
        },
        [request, auth, notify, indexFirstConnector, indexLastConnector]
    );
    //====================================================================
    //====================================================================+

    //====================================================================
    //====================================================================
    // SEARCH
    const searchFullname = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.client.fullname
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setConnectors(searching);
            setCurrentConnectors(searching.slice(0, countPage));
        },
        [searchStorage, countPage]
    );

    const searchId = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.client.id.toString().includes(e.target.value)
            );
            setConnectors(searching);
            setCurrentConnectors(searching.slice(0, countPage));
        },
        [searchStorage, countPage]
    );

    const searchProbirka = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.probirka.toString().includes(e.target.value)
            );
            setConnectors(searching);
            setCurrentConnectors(searching.slice(0, countPage));
        },
        [searchStorage, countPage]
    );

    const searchPhone = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.client.phone.toString().includes(e.target.value)
            );
            setConnectors(searching);
            setCurrentConnectors(searching.slice(0, countPage));
        },
        [searchStorage, countPage]
    );
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const setPageSize = useCallback(
        (e) => {
            setCurrentPage(0);
            setCountPage(e.target.value);
            setCurrentConnectors(connectors.slice(0, countPage));
        },
        [countPage, connectors]
    );

    //====================================================================
    //====================================================================
    // CLIENT

    const [client, setClient] = useState({
        clinica: auth.clinica && auth.clinica._id,
        reseption: auth.user && auth.user._id,
    });
    const [connector, setConnector] = useState({
        clinica: auth.clinica && auth.clinica._id,
        probirka: 0,
    });

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // ChangeDate

    const changeStart = (e) => {
        setBeginDay(new Date(new Date(e).setUTCHours(0, 0, 0, 0)));
        getConnectors(new Date(new Date(e).setUTCHours(0, 0, 0, 0)), endDay);
    };

    const changeEnd = (e) => {
        const date = new Date(
            new Date(new Date().setDate(new Date(e).getDate() + 1)).setUTCHours(
                0,
                0,
                0,
                0
            )
        );

        setEndDay(date);
        getConnectors(beginDay, date);
    };

    //====================================================================
    //====================================================================
    // Payment

    const [services, setServices] = useState([])
    const [products, setProducts] = useState([])
    const [index, setIndex] = useState()

    const [allprice, setAllPrice] = useState(0)
    const [payments, setPayments] = useState(0)
    const [discounts, setDiscounts] = useState(0)
    const [payment, setPayment] = useState({
        payment: 0,
        card: 0,
        cash: 0,
        transfer: 0,
        debt: 0
    })
    const [totalpayment, setTotalPayment] = useState(0)
    const [discount, setDiscount] = useState({
        discount: 0
    })

    const changeClient = useCallback((connector, index) => {
        setIndex(index)

        let servs = JSON.parse(JSON.stringify(connector.services))
        for (const serv of servs) {
            if (!serv.payment && !serv.refuse) {
                serv.payment = true
            }
        }
        let prods = JSON.parse(JSON.stringify(connector.products))
        for (const prod of prods) {
            if (!prod.payment && !prod.refuse) {
                prod.payment = true
            }
        }
        setServices(servs)
        setProducts(prods)
        setClient(JSON.parse(JSON.stringify(connector.client)))
        let s = connector.services.reduce((summa, service) => {
                return (
                    summa +
                    service.service.price * parseInt(service.pieces)
                );
            }, 0) +
            connector.products.reduce((summa, product) => {
                return (
                    summa +
                    product.product.price * parseInt(product.pieces)
                );
            }, 0)
        setAllPrice(s)
        setConnector({...connector})
        setPayments(connector.payments.reduce((summa, payment) => {
            return (summa + payment.payment)
        }, 0))
        setDiscounts(connector.discounts.reduce((summa, discount) => {
            return (summa + discount.discount)
        }, 0))
        let payment = 0
        for (const service of connector.services) {
            if (!service.payment && !service.refuse) {
                payment += service.service.price * service.pieces
            }
        }
        for (const product of connector.products) {
            if (!product.payment && !product.refuse) {
                payment += product.product.price * product.pieces
            }
        }
        setPayment({
            total: s,
            payment: payment,
            clinica: connector.clinica,
            client: connector.client,
            connector: connector._id,
            card: 0,
            cash: 0,
            transfer: 0,
            debt: 0
        })
        setTotalPayment(payment)
        setDiscount({
            total: s,
            discount: 0,
            clinica: connector.clinica,
            client: connector.client,
            connector: connector._id
        })
    }, [])

    const changeService = (e, index) => {
        let servs = [...services]
        let prods = [...products]
        if (e.target.checked) {
            servs[index].payment = true
            servs[index].refuse = false
            delete servs[index].comment
        } else {
            servs[index].payment = false
            servs[index].refuse = true
        }

        let pays = 0
        for (const i in servs) {
            if (connector.services[i].payment && !servs[i].payment) {
                pays -= servs[i].service.price * servs[i].pieces
            }
            if (!connector.services[i].payment && servs[i].payment) {
                pays += servs[i].service.price * servs[i].pieces
            }
        }
        for (const i in prods) {
            if (connector.products[i].payment && !prods[i].payment) {
                pays -= prods[i].product.price * prods[i].pieces
            }
            if (!connector.products[i].payment && prods[i].payment) {
                pays += prods[i].product.price * prods[i].pieces
            }
        }

        setServices(servs)
        setPayment({...payment, payment: pays})
    }

    const changeProduct = (e, index) => {
        let servs = [...services]
        let prods = [...products]
        if (e.target.checked) {
            prods[index].payment = true
            prods[index].refuse = false
            delete prods[index].comment
        } else {
            prods[index].payment = false
            prods[index].refuse = true
        }

        let pays = 0
        for (const i in servs) {
            if (connector.services[i].payment && !servs[i].payment) {
                pays -= servs[i].service.price * servs[i].pieces
            }
            if (!connector.services[i].payment && servs[i].payment) {
                pays += servs[i].service.price * servs[i].pieces
            }
        }
        for (const i in prods) {
            if (connector.products[i].payment && !prods[i].payment) {
                pays -= prods[i].product.price * prods[i].pieces
            }
            if (!connector.products[i].payment && prods[i].payment) {
                pays += prods[i].product.price * prods[i].pieces
            }
        }

        setProducts(prods)
        setPayment({...payment, payment: pays})
    }

    const serviceComment = (e, index) => {
        let servs = [...services]
        servs[index].comment = e.target.value
        setServices(servs)
    }
    const productComment = (e, index) => {
        let prods = [...products]
        prods[index].comment = e.target.value
        setProducts(prods)
    }

    const changeDiscount = (e) => {
        let disc = parseInt(e.target.value)

        if (disc > totalpayment - (payments + discounts + payment.debt)) {
            e.target.value = parseInt(parseInt(e.target.value) / 10)
            return notify({
                title: "Diqqat! Chegirma summasi umumiy to'lov summasidan oshmasligi kerak!",
                description: "",
                status: "error",
            });
        }

        if (disc <= 100) {
            setDiscount({
                ...discount, procient: disc, discount: totalpayment * disc / 100
            })
            setPayment({
                ...payment,
                payment: totalpayment - payments - discounts - totalpayment * disc / 100 - parseInt(payment.debt)
            })
        } else {
            setDiscount({
                ...discount, procient: 0, discount: disc
            })
            setPayment({
                ...payment,
                payment: totalpayment - payments - discounts - parseInt(disc) - parseInt(payment.debt)
            })
        }
    }

    const discountComment = (e) => {
        if (e.target.value === "delete") {
            let s = discount
            delete s.comment
            setDiscount(s)
        } else {
            setDiscount({...discount, comment: e.target.value})
        }
    }

    const changeDebt = (e) => {
        let debt = parseInt(e.target.value)
        if (debt > totalpayment - (payments + discounts + discount.discount)) {
            e.target.value = parseInt(parseInt(e.target.value) / 10)
            return notify({
                title: "Diqqat! Qarz summasi umumiy to'lov summasidan oshmasligi kerak!",
                description: "",
                status: "error",
            });
        }
        setPayment({
            ...payment,
            debt: parseInt(e.target.value),
            payment: totalpayment - payments - discounts - parseInt(e.target.value) - parseInt(discount.discount)
        })

    }

    const debtComment = (e) => {
        setPayment({
            ...payment, comment: e.target.value
        })
    }
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // CreatePayment

    const checkPayment = () => {
        if (checkData(payment, payments, discount, discounts, services, products)) {
            return toast(checkData(payment, payments, discount, discounts, services, products))

        } else {
            return alert("Xatosiz")
        }
    }

    const createHandler = useCallback(async () => {

        try {
            const data = await request(
                `/api/cashier/offline/payment`,
                'POST',
                {
                    payment: {...payment},
                    discount: {...discount},
                    services: {...services},
                    products: {...products}
                },
                {
                    Authorization: `Bearer ${auth.token}`,
                },
            )
            console.log(data)
            notify({
                title: "To'lov muvaffaqqiyatli amalga oshirildi.",
                description: '',
                status: 'success',
            })

        } catch (error) {
            notify({
                title: error,
                description: '',
                status: 'error',
            })
        }
    }, [
        auth,
        payment,
        discount,
        request,
        services,
        products,
        notify
    ])

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // useEffect

    const [t, setT] = useState(0);

    useEffect(() => {
        if (auth.clinica && !t) {
            setT(1);
            getConnectors(beginDay, endDay);
        }
    }, [
        auth,
        getConnectors,
        t,
        beginDay,
        endDay,
    ]);

    //====================================================================
    //====================================================================
    return (
        <div>
            <div className="content-wrapper px-lg-5 px-3">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-12 text-end">
                                <button
                                    className={`btn btn-primary mb-2 w-100 ${
                                        visible ? "d-none" : ""
                                    }`}
                                    onClick={changeVisible}
                                >
                                    Malumot
                                </button>
                                <button
                                    className={`btn btn-primary mb-2 w-100 ${
                                        visible ? "" : "d-none"
                                    }`}
                                    onClick={changeVisible}
                                >
                                    Malumot
                                </button>
                            </div>
                        </div>
                        <div className={` ${visible ? "" : "d-none"}`}>
                            <RegisterClient
                                checkPayment={checkPayment}
                                debtComment={debtComment}
                                changeDebt={changeDebt}
                                serviceComment={serviceComment}
                                productComment={productComment}
                                discountComment={discountComment}
                                discount={discount}
                                changeDiscount={changeDiscount}
                                setPayment={setPayment}
                                changeProduct={changeProduct}
                                changeService={changeService}
                                allprice={allprice}
                                discounts={discounts}
                                payments={payments}
                                payment={payment}
                                client={client}
                                index={index}
                                services={services}
                                products={products}
                                setServices={setServices}
                                setProducts={setProducts}
                                loading={loading}
                                connector={connector}
                            />
                        </div>
                        <TableClients
                            setVisible={setVisible}
                            modal1={modal1}
                            setModal1={setModal1}
                            // setCheck={setCheck}
                            changeStart={changeStart}
                            changeEnd={changeEnd}
                            searchPhone={searchPhone}
                            changeClient={changeClient}
                            setConnector={setConnector}
                            searchFullname={searchFullname}
                            searchId={searchId}
                            connectors={connectors}
                            searchProbirka={searchProbirka}
                            setConnectors={setConnectors}
                            setCurrentPage={setCurrentPage}
                            countPage={countPage}
                            setCountPage={setCountPage}
                            currentConnectors={currentConnectors}
                            setCurrentConnectors={setCurrentConnectors}
                            currentPage={currentPage}
                            setPageSize={setPageSize}
                            // setModal2={setModal2}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            {/* <CheckModal
        baseUrl={baseUrl}
        connector={check}
        modal={modal1}
        setModal={setModal1}
      /> */}

            {/* <Modal
        modal={modal}
        text={"ma'lumotlar to'g'ri kiritilganligini tasdiqlaysizmi?"}
        setModal={setModal}
        handler={client._id ? addHandler : createHandler}
        basic={client.lastname + " " + client.firstname}
      /> */}
        </div>
    );
};
