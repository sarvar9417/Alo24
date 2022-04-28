import React from "react";
import "react-datepicker/dist/react-datepicker.css";

export const PaymentClients = ({
  payment,
  checkPayment,
  loading,
  setPayment,
  inputPayment,
}) => {
  return (
    <>
      {/* Row start */}
      <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Mijozning ma'lumotlari</div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border py-1">
                      #
                    </th>
                    <th scope="col" className="border py-1">
                      Malumot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="border py-1">F.I.O.</td>
                    <td className="py-1">
                      {payment.client && payment.client.fullname}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">Telefon raqami:</td>
                    <td className="py-1">
                      {payment.client && `+998${payment.client.phone}`}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">Tugilgan yili</td>
                    <td className="py-1">
                      {payment.client &&
                        new Date(payment.client.born).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">ID:</td>
                    <td className="py-1">
                      {payment.client && payment.client.id}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">Summa:</td>
                    <td className="py-1">{payment.total && payment.total}</td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">Qarz summasi:</td>
                    <td className="py-1">{payment.debt && payment.debt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="col-md-6 ">
                <div
                  className="btn-group mb-3 w-100"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    onClick={() => {
                      setPayment({
                        ...payment,
                        type: "cash",
                        card: 0,
                        transfer: 0,
                        payment: 0,
                        cash: payment.debt,
                      });
                    }}
                    type="button"
                    className={`btn btn-sm py-1 text-white  ${
                      payment.type === "cash" ? "bg-amber-500" : "bg-teal-500"
                    }`}
                  >
                    Naqt
                  </button>
                  <button
                    onClick={() => {
                      setPayment({
                        ...payment,
                        type: "card",
                        cash: 0,
                        transfer: 0,
                        payment: 0,
                        card: payment.debt,
                      });
                    }}
                    type="button"
                    className={`btn btn-sm py-1 text-white ${
                      payment.type === "card" ? "bg-amber-500" : "bg-teal-500"
                    }`}
                  >
                    Plastik
                  </button>
                  <button
                    onClick={() => {
                      setPayment({
                        ...payment,
                        type: "transfer",
                        cash: 0,
                        card: 0,
                        payment: 0,
                        transfer: payment.debt,
                      });
                    }}
                    type="button"
                    className={`btn btn-sm py-1 text-white ${
                      payment.type === "transfer"
                        ? "bg-amber-500"
                        : "bg-teal-500"
                    }`}
                  >
                    O'tkazma
                  </button>
                  <button
                    onClick={() => {
                      setPayment({
                        ...payment,
                        type: "mixed",
                        cash: 0,
                        card: 0,
                        transfer: 0,
                        payment: 0,
                      });
                    }}
                    type="button"
                    className={`btn btn-sm py-1 text-white ${
                      payment.type === "mixed" ? "bg-amber-500" : "bg-teal-500"
                    }`}
                  >
                    Aralash
                  </button>
                </div>
                {(payment.type === "cash" || payment.type === "mixed") && (
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend w-25">
                      <span
                        className="w-100 input-group-text bg-primary text-white font-weight-bold"
                        id="inputGroup-sizing-sm"
                        style={{ fontSize: "9pt" }}
                      >
                        Naqt
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Naqt to'lov"
                      value={payment.cash || ""}
                      name="cash"
                      onChange={inputPayment}
                    />
                  </div>
                )}
                {(payment.type === "card" || payment.type === "mixed") && (
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend w-25">
                      <span
                        className="w-100 input-group-text bg-primary text-white font-weight-bold"
                        id="inputGroup-sizing-sm"
                        style={{ fontSize: "9pt" }}
                      >
                        Plastik
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Karta orqali to'lov to'lov"
                      value={payment.card || ""}
                      name="card"
                      onChange={inputPayment}
                    />
                  </div>
                )}
                {(payment.type === "transfer" || payment.type === "mixed") && (
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend w-25">
                      <span
                        className="w-100 input-group-text bg-primary text-white font-weight-bold"
                        id="inputGroup-sizing-sm"
                        style={{ fontSize: "9pt" }}
                      >
                        O'tkazma
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="O'tkazma to'lov"
                      value={payment.transfer || ""}
                      name="transfer"
                      onChange={inputPayment}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between text-right">
                <div
                  className={`font-bold `}
                  style={{
                    visibility: `${
                      payment.card + payment.cash + payment.transfer ===
                      payment.debt
                        ? "hidden"
                        : "visible"
                    }`,
                  }}
                >
                  Qarz:{" "}
                  {payment.debt -
                    (payment.card + payment.cash + payment.transfer)}
                </div>
                {loading ? (
                  <button className="btn btn-success" disabled>
                    <span className="spinner-border spinner-border-sm"></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="btn btn-primary py-0"
                    onClick={() => {
                      checkPayment();
                      setPayment({
                        ...payment,
                        payment: payment.card + payment.cash + payment.transfer,
                        debt:
                          payment.debt -
                          (payment.card + payment.cash + payment.transfer),
                      });
                    }}
                  >
                    To'lov qilish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Row end */}
    </>
  );
};
