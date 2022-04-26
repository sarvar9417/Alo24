import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Modal} from "./../components/Modal";
import {useToast} from "@chakra-ui/react";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/AuthContext";
import {ExcelCols} from "./uploadExcel/ExcelCols";
import TableServices from "./TableServices";
import RegisterTables from "./RegisterTables";
// import {checkServices} from "./uploadExcel/checkData";

const Tables = () => {
    //====================================================================
    //====================================================================
    // Pagenation
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)

    const indexLastService = (currentPage + 1) * countPage
    const indexFirstService = indexLastService - countPage
    const [currentServices, setCurrentServices] = useState([])
    const [searchStorage, setSearchStrorage] = useState()

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [visible, setVisible] = useState(false)
    const [remove, setRemove] = useState()

    const clearInputs = useCallback(() => {
        const inputs = document.getElementsByTagName('textarea')
        for (const input of inputs) {
            input.value = ''
        }
    }, [])
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const toast = useToast()

    const notify = useCallback(
        (data) => {
            toast({
                title: data.title && data.title,
                description: data.description && data.description,
                status: data.status && data.status,
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
        },
        [toast],
    )
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)

    const [services, setServices] = useState([])
    const [service, setService] = useState()

    const getServices = useCallback(async () => {
        try {
            const data = await request(
                `/api/doctor/table/services`,
                'POST',
                {clinica: auth.clinica._id, doctor: auth.user},
                {
                    Authorization: `Bearer ${auth.token}`,
                },
            )
            setServices(data)
            setSearchStrorage(data)
            setCurrentServices(data.slice(indexFirstService, indexLastService))
        } catch (error) {
            notify({
                title: error,
                description: '',
                status: 'error',
            })
        }
    }, [
        request,
        auth,
        notify,
        setCurrentServices,
        indexLastService,
        indexFirstService,
        setSearchStrorage,
    ])
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const [imports, setImports] = useState([])
    const [changeImports, setChangeImports] = useState([])
    const sections = [
        {name: 'Shablon nomi', value: 'name'},
        {name: "Shablon", value: 'service'}
    ]
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const setPageSize = useCallback(
        (e) => {
            setCurrentPage(0)
            setCountPage(e.target.value)
            setCurrentServices(services.slice(0, e.target.value))
        },
        [services],
    )
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // Handlers

    const checkUploadData = () => {
        // if (checkServices(changeImports))
        //     return notify(checkServices(imports))
        createAllHandler()
    }

    const createHandler = useCallback(async () => {
        if (!service.name) {
            return notify({
                title: "Diqqat! Shablon nomini kiriting.",
                description: '',
                status: 'error',
            })
        }
        if (!service.service) {
            return notify({
                title: "Diqqat! Shablonni kiriting.",
                description: '',
                status: 'error',
            })
        }
        try {
            const data = await request(
                `/api/doctor/service/create`,
                'POST',
                {service: {...service, clinica: auth.clinica._id, doctor: auth.user._id}},
                {
                    Authorization: `Bearer ${auth.token}`,
                },
            )
            notify({
                title: `${data.name} shabloni yaratildi!`,
                description: '',
                status: 'success',
            })
            getServices()
            setService({})
            clearInputs()
        } catch (error) {
            notify({
                title: error,
                description: '',
                status: 'error',
            })
        }
    }, [auth, request, getServices, service, notify, clearInputs])

    const createAllHandler = useCallback(async () => {
        try {
            const data = await request(
                `/api/doctor/service/createall`,
                'POST',
                {services: [...changeImports], clinica: auth.clinica._id, doctor: auth.user._id},
                {
                    Authorization: `Bearer ${auth.token}`,
                },
            )
            localStorage.setItem("data", data)
            notify({
                title: `Shablonlar yaratildi!`,
                description: '',
                status: 'success',
            })
            getServices()
            setService({})
            clearInputs()
            setModal2(false)
        } catch (error) {
            notify({
                title: error,
                description: '',
                status: 'error',
            })
        }
    }, [auth, request, notify, clearInputs, getServices, changeImports])

    const deleteHandler = useCallback(async () => {
        try {
            const data = await request(
                `/api/doctor/service/delete`,
                'POST',
                {service: {...remove}},
                {
                    Authorization: `Bearer ${auth.token}`,
                },
            )
            notify({
                title: `${data.name} shabloni o'chirildi!`,
                description: '',
                status: 'success',
            })
            getServices()
            setRemove()
            clearInputs()
            setModal(false)
        } catch (error) {
            notify({
                title: error,
                description: '',
                status: 'error',
            })
        }
    }, [auth, request, getServices, remove, notify, clearInputs])

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // SEARCH

    const searchService = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase()),
            )
            setServices(searching)
            setCurrentServices(searching.slice(0, countPage))
        },
        [searchStorage, countPage],
    )

    const searchServiceType = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.servicetype.name.toLowerCase().includes(e.target.value.toLowerCase()),
            )
            setServices(searching)
            setCurrentServices(searching.slice(0, countPage))
        },
        [searchStorage, countPage],
    )

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // Service place visible

    const servicePlace = (e, index) => {
        let servicess = [...services]
        servicess[index].place = e.target.value
        setServices(servicess)
    }

    const serviceVisible = (e, index) => {
        let servicess = [...services]
        servicess[index].visible = e.target.checked
        setServices(servicess)
    }

    const updateService = useCallback(async (index) => {
        try {
            const data = await request(
                `/api/doctor/table/serviceupdate`,
                'POST',
                {service: {...services[index]}},
                {
                    Authorization: `Bearer ${auth.token}`,
                },
            )
            notify({
                title: `${data.name} xizmati yangilandi!`,
                description: '',
                status: 'success',
            })
            let servicess = [...services]
            servicess[index] = data
            setServices(servicess)
        } catch (error) {
            notify({
                title: error,
                description: '',
                status: 'error',
            })
        }
    }, [auth, request, setServices, notify, services])

    //====================================================================
    //====================================================================
    // useEffect

    const [t, setT] = useState()
    useEffect(() => {
        if (!t) {
            setT(1)
            getServices()
        }
    }, [getServices, t])
    //====================================================================
    //====================================================================

    return (
        <div className="container">
            <div className={visible ? 'd-block' : 'd-none'}>
                <RegisterTables
                    service={service}
                    // setService={setService}
                    // createHandler={createHandler}
                />
            </div>

            <div className='mt-4'>
                <TableServices
                    setVisible={setVisible}
                    searchServiceType={searchServiceType}
                    updateService={updateService}
                    serviceVisible={serviceVisible}
                    servicePlace={servicePlace}
                    setService={setService}
                    services={services}
                    currentServices={currentServices}
                    setModal={setModal}
                    setCurrentServices={setCurrentServices}
                    setModal2={setModal2}
                    countPage={countPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setRemove={setRemove}
                    loading={loading}
                    setImports={setImports}
                    setPageSize={setPageSize}
                    searchService={searchService}
                />
            </div>


            <Modal
                modal={modal2}
                setModal={setModal2}
                handler={checkUploadData}
                text={
                    <ExcelCols
                        createdData={changeImports}
                        setData={setChangeImports}
                        data={imports}
                        sections={sections}
                    />
                }
            />

            <Modal
                modal={modal}
                setModal={setModal}
                handler={deleteHandler}
                text=" shablonini ochirishni tasdiqlaysizmi?"
                basic={remove && remove.name}
            />
        </div>
    );
};

export default Tables;
