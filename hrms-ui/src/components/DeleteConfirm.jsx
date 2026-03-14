import Button from "./common/Button";

function DeleteConfirm({ onConfirm, onCancel }) {

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg w-[360px] p-6">

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Delete Employee
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this employee?
        </p>

        <div className="flex justify-end gap-3">

          <Button  variant="secondary" onClick={onCancel}>
                Cancel
          </Button>

          <Button  variant="danger" onClick={onConfirm}>
                Delete
          </Button>

        </div>

      </div>

    </div>

  );

}

export default DeleteConfirm;