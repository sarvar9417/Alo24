import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faPrint } from "@fortawesome/free-solid-svg-icons";
import { SamplesToTable } from "./SamplesToTable";

export const Samples = () => {
  const [services, setServices] = useState([
    {
      department: "Uzi",
      service: "Ekg",
      serviceid: 1,
      place: 12,
      visible: false,
    },
    {
      department: "Kardialogiya",
      service: "Tamographia",
      serviceid: 2,
      place: 8,
      visible: false,
    },
    {
      department: "Uzi",
      service: "Ekg",
      serviceid: 3,
      place: 15,
      visible: true,
    },
  ]);

  const [place, setPlace] = useState("");
  const [visible, setVisible] = useState(false);

  const updateService = (service) => {
    const data = [...services].map((item) => {
      if (item.serviceid === service.serviceid) {
        item.place = place;
        item.visible = visible;
      }
      return;
    });
    setServices(data);
    setPlace(0);
    setVisible(false);
  };

  const [tableTamplate, setTableTamplate] = useState({});

  const [name, setName] = useState("");
  const [nameBody, setNameBody] = useState("");

  const [result, setResult] = useState("");
  const [resultBody, setResultBody] = useState("");

  const [norm, setNorm] = useState("");
  const [normBody, setNormBody] = useState("");

  const clearStates = () => {
    setNameBody("");
    setResultBody("");
    setNormBody("");
  };
  const changeProperty = () => {
    let arr = [name, result, norm];
    const table = [...tableTamplate.table].map((item) => {
      let obj = Object.fromEntries(
        Object.entries(item).map(([key, value], index) => {
          return [(key = arr[index]), value];
        })
      );
      return obj;
    });
    setTableTamplate({ ...tableTamplate, table: table });
  };

  const addTamplate = () => {
    if (name && nameBody && result && resultBody && norm && normBody) {
      const obj = {};
      obj[name] = nameBody;
      obj[result] = resultBody;
      obj[norm] = normBody;
      if (tableTamplate.table) {
        const table = [...tableTamplate.table];
        table.push(obj);
        setTableTamplate({ ...tableTamplate, table: table });
        clearStates();
      } else {
        const arr = [obj];
        setTableTamplate({ ...tableTamplate, table: arr });
        clearStates();
      }
    }
  };
  console.log(tableTamplate);
  return (
    <div className="container">
      <div style={{ display: `${tableTamplate.serviceid ? "block" : "none"}` }}>
        <SamplesToTable
          name={name}
          setName={setName}
          nameBody={nameBody}
          setNameBody={setNameBody}
          result={result}
          setResult={setResult}
          resultBody={resultBody}
          setResultBody={setResultBody}
          norm={norm}
          setNorm={setNorm}
          normBody={normBody}
          setNormBody={setNormBody}
          addTamplate={addTamplate}
          tableTamplate={tableTamplate}
          changeProperty={changeProperty}
        />
      </div>
      <div className="table-container">
        <div className="table-container">
          <div className="table-responsive">
            <table className="table m-0">
              <thead>
                <tr>
                  <th className="border py-1">№</th>
                  <th className="border py-1">Bo'limlar</th>
                  <th className="border py-1">Xizmatlar</th>
                  <th className="border py-1">Xizmat jadvali</th>
                  <th className="border py-1">Jadvaldagi o'rni</th>
                  <th className="border py-1">Jadvalda ko'rinishi</th>
                  <th className="border py-1">Saqlash</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className="border py-1 font-weight-bold text-right"
                        style={{ maxWidth: "30px !important" }}
                      >
                        {index + 1}
                      </td>
                      <td className="border py-1 font-weight-bold text-right">
                        {service.department}
                      </td>
                      <td className="border py-1 text-center">
                        {service.name}
                      </td>
                      <td className="border py-1 text-center">
                        <button
                          className="btn btn-success py-0"
                          onClick={() =>
                            setTableTamplate({
                              serviceid: service.serviceid,
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faPenAlt} />
                        </button>
                      </td>
                      <td className="border py-1 text-center">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={service.place}
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      </td>
                      <td className="border py-1 text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={service.visible ? true : false}
                            onChange={(e) => setVisible(e.target.value)}
                            id="defaultCheck1"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                      </td>
                      <td className="border py-1 text-center">
                        <button
                          className="btn btn-success py-0"
                          onClick={() => updateService(service)}
                        >
                          <FontAwesomeIcon icon={faPrint} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
