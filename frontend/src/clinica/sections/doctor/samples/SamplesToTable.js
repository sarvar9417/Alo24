import React from "react";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SamplesToTable = ({
  name,
  setName,
  nameBody,
  setNameBody,
  norm,
  setNorm,
  normBody,
  setNormBody,
  result,
  setResult,
  resultBody,
  setResultBody,
  addTamplate,
  tableTamplate,
  changeProperty,
}) => {
  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="table m-0">
          <thead>
            <tr>
              <th className="border py-1 text-center">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </th>
              <th className="border py-1 text-center">
                <input
                  type="text"
                  className="form-control"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                />
              </th>
              <th className="border py-1 text-center">
                <input
                  type="text"
                  className="form-control"
                  value={norm}
                  onChange={(e) => setNorm(e.target.value)}
                />
              </th>
              <th className="border py-1 text-center">
                <button
                  className="btn btn-success py-0"
                  onClick={() => changeProperty()}
                >
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 text-center">
                <input
                  type="text"
                  value={nameBody}
                  onChange={(e) => setNameBody(e.target.value)}
                  className="form-control"
                />
              </td>
              <td className="border py-1 text-center">
                <input
                  type="text"
                  value={resultBody}
                  onChange={(e) => setResultBody(e.target.value)}
                  className="form-control"
                />
              </td>
              <td className="border py-1 text-center">
                <input
                  type="text"
                  value={normBody}
                  onChange={(e) => setNormBody(e.target.value)}
                  className="form-control"
                />
              </td>
              <td className="border py-1 text-center">
                <button
                  className="btn btn-success py-0"
                  onClick={() => addTamplate()}
                >
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th
                className="border py-1 font-weight-bold"
                style={{ maxWidth: "50px" }}
              >
                Nomlanish/ {name}
              </th>
              <th
                className="border py-1 font-weight-bold"
                style={{ maxWidth: "50px" }}
              >
                Natija/ {result}
              </th>
              <th
                className="border py-1 font-weight-bold"
                style={{ maxWidth: "50px" }}
              >
                Me'yor/ {norm}
              </th>
              <th
                className="border py-1 text-center font-weight-bold"
                style={{ maxWidth: "50px" }}
              >
                Tahrirlash
              </th>
              <th
                className="border py-1 text-center font-weight-bold"
                style={{ maxWidth: "50px" }}
              >
                O'chirish
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td className="border" style={{ maxWidth: "50px" }}>
                {nameBody}
              </td>
              <td className="border" style={{ maxWidth: "50px" }}>
                {resultBody}
              </td>
              <td className="border" style={{ maxWidth: "50px" }}>
                {normBody}
              </td>
              <td
                className="border py-1 text-center"
                style={{ maxWidth: "50px" }}
              >
                <button className="btn btn-success py-0">
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </td>
              <td className="border py-1 text-center">
                <button className="btn btn-success py-0">
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </td>
            </tr>
            {tableTamplate.table &&
              tableTamplate.table.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((item, index) => (
                    <td className="border py-1" key={index}>
                      {item}
                    </td>
                  ))}
                  <td
                    className="border py-1 text-center"
                    style={{ maxWidth: "50px" }}
                  >
                    <button className="btn btn-success py-0">
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                  </td>
                  <td className="border py-1 text-center">
                    <button className="btn btn-success py-0">
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
