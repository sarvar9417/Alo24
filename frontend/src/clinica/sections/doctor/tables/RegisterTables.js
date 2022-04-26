import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";

const RegisterTables = ({service}) => {
    const changeCols = () => {

    }
    return (
        <div className="my-4">
            <table className="w-full">
                <thead>
                <tr className="bg-primary">
                    <th className="border p-2">
                        <input
                            placeholder="Ustun nomi"
                            className="bg-primary outline-0 text-white text-center font-bold"
                            type="text"
                        />
                    </th>
                    <th className="border p-2">
                        <input
                            placeholder="Ustun nomi"
                            className="bg-primary outline-0 text-white text-center font-bold"
                            type="text"
                        />
                    </th>
                    <th className="border p-2">
                        <input
                            placeholder="Ustun nomi"
                            className="bg-primary outline-0 text-white text-center font-bold"
                            type="text"
                        />
                    </th>
                    <th className="border p-2">
                        <input
                            placeholder="Ustun nomi"
                            className="bg-primary outline-0 text-white text-center font-bold"
                            type="text"
                        />
                    </th>
                    <th className="border p-2">
                        <input
                            placeholder="Ustun nomi"
                            className="bg-primary outline-0 text-white text-center font-bold"
                            type="text"
                        />
                    </th>

                    <th className="border p-2">
                        <button className="bg-teal-500 text-white px-3 ">
                            <FontAwesomeIcon icon={faFloppyDisk}/>
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white">
                    <td className="border">
                        <textarea className="w-full h-full outline-0 px-2 m-0" type="text"></textarea>
                    </td>
                    <td className="border">
                        <textarea className="w-full h-full outline-0 px-2 m-0" type="text"></textarea>
                    </td>
                    <td className="border">
                        <textarea className="w-full h-full outline-0 px-2 m-0" type="text"></textarea>
                    </td>
                    <td className="border">
                        <textarea className="w-full h-full outline-0 px-2 m-0" type="text"></textarea>
                    </td>
                    <td className="border">
                        <textarea className="w-full h-full outline-0 px-2 m-0" type="text"></textarea>
                    </td>
                    <td className="text-center border">
                        <button className="bg-teal-500 px-3 text-white font-bold rounded-sm">+</button>
                    </td>
                </tr>
                {
                    service && service.tables.map((table, index) => {
                        return <tr key={index} className="bg-white">
                            <td className="border">
                                <textarea
                                    className="w-full h-full outline-0 px-2 m-0"
                                    type="text"
                                    value={table.col1}
                                    onChange={() => {
                                    }}
                                >
                                </textarea>
                            </td>
                            <td className="border">
                                <textarea
                                    className="w-full h-full outline-0 px-2 m-0"
                                    type="text"
                                    value={table.col2}
                                >
                                </textarea>
                            </td>
                            <td className="border">
                                <textarea
                                    className="w-full h-full outline-0 px-2 m-0"
                                    type="text"
                                    value={table.col3}
                                >
                                </textarea>
                            </td>
                            <td className="border">
                                <textarea
                                    className="w-full h-full outline-0 px-2 m-0"
                                    type="text"
                                    value={table.col4}
                                >
                                </textarea>
                            </td>
                            <td className="border">
                                <textarea
                                    className="w-full h-full outline-0 px-2 m-0"
                                    type="text"
                                    value={table.col5}
                                >
                                </textarea>
                            </td>
                            <td className="text-center border">
                                <button className="bg-teal-500 px-3 py-1 text-white font-bold rounded-sm">
                                    <FontAwesomeIcon icon={faFloppyDisk}/>
                                </button>
                            </td>
                        </tr>
                    })
                }
                <tr>

                </tr>
                </tbody>
            </table>

        </div>
    );
};

export default RegisterTables;
