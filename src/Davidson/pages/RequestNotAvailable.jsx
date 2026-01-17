import React from "react";
import { AlertTriangle } from "lucide-react";

const RequestNotAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
      <AlertTriangle size={48} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Request Not Available
      </h1>
      <p className="text-gray-600 max-w-md">
        The hospital blood request you are trying to view is no longer available.
        It may have been removed or fulfilled.
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-20 w-25 h-max bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default RequestNotAvailable;
