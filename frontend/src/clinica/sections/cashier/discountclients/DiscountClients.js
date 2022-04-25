import { useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { TableClients } from "./clientComponents/TableClients";

export const DiscountClients = () => {
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

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // RegisterPage
  // const [visible, setVisible] = useState(false);

  // const changeVisible = () => setVisible(!visible);

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
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // getConnectors
  const [connectors, setConnectors] = useState([]);
  const [searchStorage, setSearchStrorage] = useState([]);

  const [commentSelect, setCommentSelect] = useState([]);

  const getDiscountConnectors = (data) => {
    const discount = data.filter((item) => {
      if (item.discounts.length > 0) {
        return item;
      }
      return null;
    });
    setCurrentConnectors(discount);
    setConnectors(discount);
    setSearchStrorage(discount.slice(indexFirstConnector, indexLastConnector));
  };

  const getComments = (data) => {
    let arr = [];
    const discount = data.filter((item) => {
      if (item.discounts.length > 0) {
        return item;
      }
      return null;
    });
    for (let i = 0; i < discount.length; i++) {
      const el = discount[i];
      if (!arr.includes(el.discounts[el.discounts.length - 1].comment)) {
        arr.push(el.discounts[el.discounts.length - 1].comment);
      }
    }
    setCommentSelect(arr);
  };

  const getConnectors = useCallback(
    async (beginDay, endDay) => {
      try {
        const data = await request(
          `/api/cashier/offline/getall`,
          "POST",
          { clinica: auth && auth.clinica._id, beginDay, endDay },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        getDiscountConnectors(data);
        getComments(data);
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
  //====================================================================
  console.log(commentSelect);
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

  const sortComment = (e) => {
    let sortEl = [];
    if (e.target.value === "none") {
      sortEl = [...searchStorage];
    } else {
      sortEl = [...searchStorage].filter((item) => {
        return (
          item.discounts[item.discounts.length - 1].comment === e.target.value
        );
      });
    }
    setCurrentConnectors(sortEl.slice(0, countPage));
  };

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

  // const [connector, setConnector] = useState({
  //   clinica: auth.clinica && auth.clinica._id,
  //   probirka: 0,
  // });

  // const [services, setServices] = useState([]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // PRODUCTS
  // const [products, setProducts] = useState([]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // CLIENT

  // const [client, setClient] = useState({
  //   clinica: auth.clinica && auth.clinica._id,
  //   reseption: auth.user && auth.user._id,
  // });

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

  //===================================================================
  //===================================================================
  //CreateHandler

  // const createHandler = useCallback(async () => {
  //   try {
  //     const data = await request(
  //       `/api/cashier/offline/payment`,
  //       "POST",
  //       {
  //         payment: { ...payment, payment: payCount },
  //       },
  //       {
  //         Authorization: `Bearer ${auth.token}`,
  //       }
  //     );
  //     localStorage.setItem("data", data);
  //     setModal(false);
  //     setVisible(false);
  //     setPayCount("");
  //     notify({
  //       title: "To'lov muvaffaqqiyatli amalga oshirildi.",
  //       description: "",
  //       status: "success",
  //     });
  //   } catch (error) {
  //     notify({
  //       title: error,
  //       description: "",
  //       status: "error",
  //     });
  //   }
  // }, [auth, payment, request, notify]);

  //===================================================================
  //===================================================================
  console.log(currentConnectors);
  //====================================================================
  //====================================================================
  // useEffect

  const [t, setT] = useState(0);

  useEffect(() => {
    if (auth.clinica && !t) {
      setT(1);
      getConnectors(beginDay, endDay);
      // getDepartments();
      // getCounterDoctors();
      // getAdvers();
      // getProducts();
      // getBaseUrl();
    }
  }, [
    auth,
    getConnectors,
    // getAdvers,
    t,
    // getProducts,
    // getCounterDoctors,
    // getDepartments,
    // getBaseUrl,
    beginDay,
    endDay,
  ]);

  return (
    <div>
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <TableClients
              currentConnectors={currentConnectors}
              setCurrentConnectors={setCurrentConnectors}
              searchFullname={searchFullname}
              searchId={searchId}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              countPage={countPage}
              changeStart={changeStart}
              changeEnd={changeEnd}
              currentPage={currentPage}
              sortComment={sortComment}
              commentSelect={commentSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
