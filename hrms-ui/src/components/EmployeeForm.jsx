import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import Button from "./common/Button";

function EmployeeForm({ onEmployeeAdded, onClose }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        department: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!form.fullName || !form.email || !form.department) {
            return "All fields are required";
        }

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(form.email)) {
            return "Please enter a valid email";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/employees", form);

            if (onEmployeeAdded) {
                onEmployeeAdded(res.data);
            }

            setForm({
                fullName: "",
                email: "",
                department: "",
            });

            toast.success("Employee Added");

            onClose(); // close modal after success

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to add employee"
            );

            toast.error("Failed to add employee");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >

            {/* Modal Card */}

            <div
                className="bg-white rounded-lg shadow-lg w-[600px] p-6"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between mb-4">

                    <h3 className="text-lg font-semibold text-gray-800">
                        Add Employee
                    </h3>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-lg"
                    >
                        ✕
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    {/* Full Name */}

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter employee name"
                            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Department */}

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm text-gray-600 mb-1">
                            Department
                        </label>

                        <input
                            type="text"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            placeholder="Enter department"
                            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Actions */}

                    <div className="md:col-span-2 flex items-center justify-end mt-2 gap-3">

                        {error && (
                            <span className="text-sm text-red-500">
                                {error}
                            </span>
                        )}
                        <Button disabled={loading}  variant="primary" onClick={handleSubmit}>
                            {loading ? "Saving..." : "Save"}
                        </Button>


                    </div>

                </form>

            </div>

        </div>
    );
}

export default EmployeeForm;