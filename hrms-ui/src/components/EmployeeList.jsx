import { useState } from "react";
import {
    TrashIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import API from "../services/api";
import DeleteConfirm from "./DeleteConfirm";
import AttendanceModal from "./AttendanceModal";
import toast from "react-hot-toast";
import SearchInput from "./common/SearchInput";
import EmployeeForm from "./EmployeeForm";
import Button from "./common/Button";

function EmployeeList({ employees, loading, onEmployeeDeleted, onEmployeeAdded }) {
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [editForm, setEditForm] = useState({});

    const [sortField, setSortField] = useState(null);
    const [sortDir, setSortDir] = useState("asc");

    const [deleteId, setDeleteId] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openModal, setOpenModal] = useState(false);


    const openAddNewModal = ()=>{
        setOpenModal(true)
    }
    const closeAddNewModal =()=>{
        setOpenModal(false)
    }

    const openAttendance = (emp) => {
        setSelectedEmployee(emp);
    };

    const closeAttendance = () => {
        setSelectedEmployee(null);
    };

    const startEditing = (emp) => {
        setEditingId(emp._id);

        setEditForm({
            fullName: emp.fullName,
            email: emp.email,
            department: emp.department,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const saveEdit = async (id) => {
        try {
            const res = await API.put(`/employees/${id}`, editForm);

            const updatedEmployee = res.data;

            const index = employees.findIndex((e) => e._id === id);

            if (index !== -1) {
                employees[index] = updatedEmployee;
            }

            toast.success("Employee updated!")

            setEditingId(null);
        } catch {
            toast.error("Failed to update employee");
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const performDelete = async () => {
        try {
            await API.delete(`/employees/${deleteId}`);

            if (onEmployeeDeleted) {
                onEmployeeDeleted(deleteId);
            }
            toast.success("Employee deleted!")
        } catch {
            toast.error("Failed to delete employee");
        }

        setDeleteId(null);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDir("asc");
        }
    };

    const filteredEmployees = employees.filter((emp) => {
        const q = search.toLowerCase();
        return (
            emp.fullName.toLowerCase().includes(q) || emp.employeeId.toLowerCase().includes(q)
        );
    })

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortField) return 0;

        const valA = a[sortField];
        const valB = b[sortField];

        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;

        return 0;
    });

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow flex flex-col h-[700px]">
                Loading employees...
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow flex flex-col h-[700px]">
                No employees added yet.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow flex flex-col h-[700px]">

            <div className="p-4 border-b flex items-center justify-between">
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or ID"
                />

                <Button variant="primary" onClick={()=>openAddNewModal()}>
                    Add Employee
                </Button>
            </div>



            <div className="flex-1 overflow-y-auto border-t">

                <table className="w-full text-sm table-fixed">

                    <thead className="bg-gray-100 text-gray-600 sticky top-0">

                        <tr className="hover:bg-gray-50 transition-colors">

                            <th
                                className="p-3 text-left cursor-pointer w-[120px]"
                                onClick={() => handleSort("employeeId")}
                            >
                                Employee ID
                            </th>

                            <th
                                className="p-3 text-left cursor-pointer w-[150px]"
                                onClick={() => handleSort("fullName")}
                            >
                                Name
                            </th>

                            <th className="p-3 text-left w-[250px]">
                                Email
                            </th>

                            <th className="p-3 text-left w-[250px]">
                                Department
                            </th>

                            <th className="p-3 text-left">
                                Attendance
                            </th>

                            <th className="p-3 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {sortedEmployees.length===0 ?(
                            <tr>
                                <td colSpan="6" className="text-center p-6 text-gray-500">
                                    No matched results.
                                </td>
                            </tr>
                        ):(
                            sortedEmployees.map((emp) => {

                            const isEditing = editingId === emp._id;

                            return (

                                <tr
                                    key={emp._id}
                                    className="border-t hover:bg-gray-50 h-[60px]"
                                >

                                    <td className="p-3 font-medium">
                                        {emp.employeeId}
                                    </td>

                                    <td className="p-3 align-middle">

                                        {isEditing ? (

                                            <input
                                                name="fullName"
                                                value={editForm.fullName}
                                                onChange={handleEditChange}
                                                className="w-full h-[32px] px-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                            />

                                        ) : (

                                            emp.fullName

                                        )}

                                    </td>

                                    <td className="p-3 align-middle">

                                        {isEditing ? (

                                            <input
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="w-full h-[32px] px-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                            />

                                        ) : (

                                            emp.email

                                        )}

                                    </td>

                                    <td className="p-3 align-middle">

                                        {isEditing ? (

                                            <input
                                                name="department"
                                                value={editForm.department}
                                                onChange={handleEditChange}
                                                className="w-full h-[32px] px-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                            />

                                        ) : (

                                            emp.department

                                        )}

                                    </td>
                                    <td className="p-3 align-middle">

                                        <Button variant="primary" onClick={() => openAttendance(emp)}>
                                            View
                                        </Button>

                                    </td>
                                    <td className="p-3 w-[110px]">

                                        <div className="flex gap-3">

                                            {isEditing ? (

                                                <>
                                                    <button
                                                        onClick={() => saveEdit(emp._id)}
                                                        className="text-green-600 hover:text-green-800"
                                                    >
                                                        <CheckIcon className="w-5 h-5" />
                                                    </button>

                                                    <button
                                                        onClick={cancelEdit}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                </>

                                            ) : (

                                                <>
                                                    <button
                                                        onClick={() => startEditing(emp)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>

                                                    <button
                                                        onClick={() => confirmDelete(emp._id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            );

                        })
                        )}

                    </tbody>

                </table>

            </div>
            
            {deleteId && (
                <DeleteConfirm
                    onConfirm={performDelete}
                    onCancel={cancelDelete}
                />
            )}

            {selectedEmployee && (
                <AttendanceModal
                    employee={selectedEmployee}
                    onClose={closeAttendance}
                />
            )}

            {openModal && (
                <EmployeeForm onClose={closeAddNewModal} onEmployeeAdded={onEmployeeAdded}/>
            )}

        </div>
    );
}

export default EmployeeList;