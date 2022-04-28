import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faPenAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Sort } from "./Sort";
import { Pagination } from "../../components/Pagination";
import { DatePickers } from "./DatePickers";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export const TableClients = ({
  changeStart,
  changeEnd,
  searchId,
  searchFullname,
  debts,
  setCurrentPage,
  countPage,
  currentDebts,
  setCurrentDebts,
  currentPage,
  setPageSize,
  loading,
  sortDebts,
  getPayment,
}) => {
  return (
    <div className="table-container">
      <div className="table-container">
        <div className="table-responsive">
          <table className="table m-0" id="discount-table">
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
                  <select
                    className="form-control form-control-sm selectpicker"
                    onChange={sortDebts}
                  >
                    <option value="none">hamma</option>
                    <option value="statsionar">Statsionar</option>
                    <option value="offline">Kunduzgi</option>
                  </select>
                </th>
                <th className="text-center">
                  <Pagination
                    setCurrentDatas={setCurrentDebts}
                    datas={debts}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={debts.length}
                  />
                </th>
                <th
                  className="text-center"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeStart} />
                </th>
                <th
                  className="text-center"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeEnd} />
                </th>
                <th className="texte-center">
                  <div className="btn btn-primary">
                    <ReactHTMLTableToExcel
                      id="reacthtmltoexcel"
                      table="discount-table"
                      sheet="Sheet"
                      buttonText="Excel"
                      filename="Chegirma"
                    />
                  </div>
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
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
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
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
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
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
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
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
                            b.client.id > a.client.id ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Telefon raqami
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
                            a.client.phone > b.client.phone ? 1 : -1
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
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
                            b.client.phone > a.client.phone ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Tugilgan yili
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
                            a.client.born > b.client.born ? 1 : -1
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
                        setCurrentDebts(
                          [...currentDebts].sort((a, b) =>
                            b.client.born > a.client.born ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  To'langan
                  <Sort
                    data={currentDebts}
                    setData={setCurrentDebts}
                    property={"total"}
                  />
                </th>
                <th className="border py-1">
                  Jami to'lov
                  <Sort
                    data={currentDebts}
                    setData={setCurrentDebts}
                    property={"total"}
                  />
                </th>
                <th className="border py-1">
                  Qarz summasi
                  <Sort
                    data={currentDebts}
                    setData={setCurrentDebts}
                    property={"debt"}
                  />
                </th>
                <th className="border py-1">
                  Qabul
                  <div className="btn-group-vertical ml-2">
                    <Sort
                      data={currentDebts}
                      setData={setCurrentDebts}
                      property={"counterAgentProcient"}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDebts.map((debt, key) => {
                return (
                  <tr key={key}>
                    <td
                      className="border py-1 font-weight-bold text-right"
                      style={{ maxWidth: "30px !important" }}
                    >
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border py-1 font-weight-bold">
                      {debt.client.fullname}
                    </td>
                    <td className="border py-1 text-right">{debt.client.id}</td>
                    <td className="border py-1 text-right">
                      {debt.client.phone}
                    </td>
                    <td className="border py-1 text-right">
                      {new Date(debt.client.born).toLocaleDateString()}
                    </td>
                    <td className="border py-1 text-right">
                      {debt.total - debt.debt}
                    </td>
                    <td className="border py-1 text-right">{debt.total}</td>
                    <td className="border py-1 text-right">{debt.debt}</td>
                    <td className="border py-1 text-center">
                      {loading ? (
                        <button className="btn btn-success" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary py-0"
                          onClick={() => getPayment(debt)}
                        >
                          <FontAwesomeIcon icon={faPenAlt} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
