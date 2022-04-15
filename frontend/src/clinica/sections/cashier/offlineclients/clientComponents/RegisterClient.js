import React from "react";
// import { DatePickers } from "./DatePickers";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

export const RegisterClient = ({
  // checkData,
  // setNewServices,
  // setNewProducts,
  newproducts,
  newservices,
  client,
  // departments,
  loading,
  connector,
}) => {
  // const [services, setServices] = useState([]);
  // const getServices = useCallback(
  //   (e) => {
  //     var s = [];
  //     if (e === "all") {
  //       departments.map((department) => {
  //         return department.services.map((service) => {
  //           return s.push({
  //             label: service.name,
  //             value: service._id,
  //             service: service,
  //             department: department,
  //           });
  //         });
  //       });
  //     } else {
  //       departments.map((department) => {
  //         if (e === department._id) {
  //           department.services.map((service) => {
  //             s.push({
  //               label: service.name,
  //               value: service._id,
  //               service: service,
  //               department: department,
  //             });
  //             return "";
  //           });
  //         }
  //         return "";
  //       });
  //     }
  //     setServices(s);
  //   },
  //   [departments]
  // );

  // useEffect(() => {
  //   if (departments) {
  //     getServices("all");
  //   }
  // }, [departments, getServices]);
  return (
    <>
      {/* Row start */}
      <div className="row gutters">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Mijozning shaxsiy ma'lumotlari</div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border py-1">
                      #
                    </th>
                    <th scope="col" className="border py-1">
                      First
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td scope="row" className="py-1">
                      Familiyasi
                    </td>
                    <td scope="row" className="py-1">
                      {client.lastname}
                    </td>
                  </tr>
                  <tr className="border">
                    <td scope="row" className=" py-1">
                      Ismi
                    </td>
                    <td className="py-1">{client.firstname}</td>
                  </tr>
                  <tr className="border">
                    <td scope="row" className="py-1">
                      Otasining ismi
                    </td>
                    <td className="py-1">{client.fathername}</td>
                  </tr>
                  <tr className="border">
                    <td scope="row" className="py-1">
                      Tugilgan sanasi
                    </td>
                    <td className="py-1">{client.born}</td>
                  </tr>
                  <tr className="border">
                    <td scope="row" className="py-1">
                      Telefon raqami
                    </td>
                    <td className="py-1">{client.phone}</td>
                  </tr>
                  <tr className="border">
                    <td scope="row" className="py-1">
                      ID
                    </td>
                    <td className="py-1">{client.id}</td>
                  </tr>
                  <tr className="border">
                    <td scope="row" className="py-1">
                      Probirka
                    </td>
                    <td className="py-1">{connector.probirka}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                Xizmat va tolovlar bilan ishlash bo'limi
              </div>
            </div>
            <div className="card-body">
              <div className="row gutters">
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="border py-1">№</th>
                        <th className="border py-1">Nomi</th>
                        <th className="border py-1">Narxi</th>
                        <th className="border py-1">Soni</th>
                        <th className="border py-1">check</th>
                        <th className="border py-1">btn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newservices &&
                        newservices.map((service, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-1">{index + 1}</td>
                              <td className="py-1">{service.service.name}</td>
                              <td className="text-right py-1">
                                {service.service.price * service.pieces}
                              </td>
                              <td className="text-right py-1">
                                <input
                                  // onChange={(e) =>
                                  //   setNewServices(
                                  //     Object.values({
                                  //       ...newservices,
                                  //       [index]: {
                                  //         ...newservices[index],
                                  //         pieces: e.target.value,
                                  //       },
                                  //     })
                                  //   )
                                  // }
                                  className="text-right outline-none"
                                  style={{ maxWidth: "50px", outline: "none" }}
                                  defaultValue={service.pieces}
                                  type="number"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      <tr className="border"></tr>
                      {newproducts &&
                        newproducts.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-1">{index + 1}</td>
                              <td className="py-1">{product.product.name}</td>
                              <td className="text-right py-1">
                                {product.product.price * product.pieces}
                              </td>
                              <td className="text-right py-1">
                                <input
                                  // onChange={(e) =>
                                  //   setNewProducts(
                                  //     Object.values({
                                  //       ...newproducts,
                                  //       [index]: {
                                  //         ...newproducts[index],
                                  //         pieces: e.target.value,
                                  //       },
                                  //     })
                                  //   )
                                  // }
                                  className="text-right outline-none"
                                  style={{ maxWidth: "50px", outline: "none" }}
                                  defaultValue={product.pieces}
                                  type="number"
                                />
                              </td>
                              <td className="text-right py-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkboxNoLabel"
                                  value=""
                                  aria-label="..."
                                />
                              </td>
                              <td className="text-right py-1">
                                <button className="btn btn-success py-0">
                                  <FontAwesomeIcon icon={faPenAlt} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th className="text-right" colSpan={2}>
                          Jami:
                        </th>
                        <th colSpan={2}>
                          {newservices.reduce((summa, service) => {
                            return (
                              summa +
                              service.service.price * parseInt(service.pieces)
                            );
                          }, 0) +
                            newproducts.reduce((summa, product) => {
                              return (
                                summa +
                                product.product.price * parseInt(product.pieces)
                              );
                            }, 0)}
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    {loading ? (
                      <button className="btn btn-primary" disabled>
                        <span className="spinner-border spinner-border-sm"></span>
                        Loading...
                      </button>
                    ) : (
                      <button onClick={checkData} className="btn btn-primary">
                        Saqlash
                      </button>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Row end */}
    </>
  );
};
