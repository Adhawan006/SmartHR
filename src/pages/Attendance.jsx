import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Attendance = () => {
    const [attendance, setAttendance] = useState([
        {
            id: 1,
            name: "Priyank Chaudhary",
            status: "Present",
        },
        {
            id: 2,
            name: "Rahul Kumar",
            status: "Absent",
        },
    ]);

    return (
        <div className="flex">
            <Sidebar />

            <div className="p-10 w-full">
                <h1 className="text-3xl font-bold mb-6">
                    Attendance
                </h1>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3">Employee</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {attendance.map((item) => (
                            <tr
                                key={item.id}
                                className="text-center border-b"
                            >
                                <td className="p-3">
                                    {item.name}
                                </td>

                                <td className="p-3">
                                    <select
                                        defaultValue={
                                            item.status
                                        }
                                        className="border p-2 rounded"
                                    >
                                        <option>
                                            Present
                                        </option>
                                        <option>
                                            Absent
                                        </option>
                                        <option>
                                            Leave
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;