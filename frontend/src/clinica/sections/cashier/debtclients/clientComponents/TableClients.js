import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faPenAlt,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Sort } from "./Sort";
import { Pagination } from "../../components/Pagination";
import { DatePickers } from "./DatePickers";

export const TableClients = ({
  changeStart,
  changeEnd,
  searchId,
  searchFullname,
  connectors,
  setCurrentPage,
  countPage,
  currentConnectors,
  setCurrentConnectors,
  currentPage,
  setPageSize,
  loading,
  client,
  setClient,
  // setDebt,
  // changeVisible,
  setVisible,
  payment,
  setPayment,
}) => {
  return (
    <div className="table-container">
      <div className="table-container">
        <div className="table-responsive">
          <table className="table m-0">
            <thead className="bg-white">
              <tr>
                <th>
                  <select
                    className="form-control form-control-sm selectpicker"
                    placeholder="Bo'limni tanlang"
                    onChange={setPageSize}
                    style={{ minWidth: "50px" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchFullname}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="F.I.O"
                  />
                </th>
                <th>
                  <input
                    onChange={searchId}
                    style={{ maxWidth: "60px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="ID"
                  />
                </th>
                <th className="text-center">
                  <Pagination
                    setCurrentDatas={setCurrentConnectors}
                    datas={connectors}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={connectors.length}
                  />
                </th>
                <th
                  className="text-center"
                  style={{ maxWidth: "120px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeStart} />
                </th>
                <th
                  className="text-center"
                  style={{ maxWidth: "120px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeEnd} />
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border py-1">№</th>
                <th className="border py-1">
                  F.I.O
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.fullname > b.client.fullname ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.fullname > a.client.fullname ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  ID
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.id > b.client.id ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.id > a.client.id ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Summa
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={"totalprice"}
                  />
                </th>
                <th className="border py-1">
                  To'langan
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.services.length > b.services.length ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.services.length > a.services.length ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Qarz summasi
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={"connector"}
                  />
                </th>
                <th className="border py-1">
                  Qabul
                  <div className="btn-group-vertical ml-2">
                    <Sort
                      data={currentConnectors}
                      setData={setCurrentConnectors}
                      property={"counterAgentProcient"}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentConnectors.map((connector, key) => {
                if (connector.payments.length > 0) {
                  return (
                    <tr key={key}>
                      <td
                        className="border py-1 font-weight-bold text-right"
                        style={{ maxWidth: "30px !important" }}
                      >
                        {currentPage * countPage + key + 1}
                      </td>
                      <td className="border py-1 font-weight-bold">
                        {connector.client.fullname}
                      </td>
                      <td className="border py-1 text-right">
                        {connector.client.id}
                      </td>
                      <td className="border py-1 text-right">
                        {
                          connector.payments[connector.payments.length - 1]
                            .total
                        }
                      </td>
                      <td className="border py-1 text-right">
                        {
                          connector.payments[connector.payments.length - 1]
                            .payment
                        }
                      </td>
                      <td className="border py-1 text-right">
                        {connector.payments[connector.payments.length - 1].debt}
                      </td>
                      <td className="border py-1 text-center">
                        {loading ? (
                          <button className="btn btn-success" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary py-0"
                            onClick={() => {
                              setClient(connector.client);
                              setPayment(
                                connector.payments[
                                  connector.payments.length - 1
                                ]
                              );
                              setVisible(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faPenAlt} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }
                return;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
