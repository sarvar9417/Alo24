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
  payment,
  client,
  payCount,
  setPayCount,
  checkPayCount,
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
                      {client.fullname && client.fullname}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">Telefon raqami:</td>
                    <td className="py-1">{client.phone && client.phone}</td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">ID:</td>
                    <td className="py-1">{client.id && client.id}</td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">Summa:</td>
                    <td className="py-1">{payment.total && payment.total}</td>
                  </tr>
                  <tr className="border">
                    <td className="border py-1">To'langan:</td>
                    <td className="py-1">
                      {payment.payment && payment.payment}
                    </td>
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
              <div className="form-group">
                <label htmlFor="">To'lov</label>
                <input
                  value={payCount}
                  onChange={(e) => setPayCount(e.target.value)}
                  type="text"
                  className="form-control form-control-sm"
                  id="payment"
                  name="pay"
                  placeholder="To'lov summasi..."
                />
              </div>
              <div className="text-right">
                {loading ? (
                  <button className="btn btn-success" disabled>
                    <span className="spinner-border spinner-border-sm"></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="btn btn-primary py-0"
                    onClick={checkPayCount}
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
