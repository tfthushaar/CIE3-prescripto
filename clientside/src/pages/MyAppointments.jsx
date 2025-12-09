import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split("_");
    if (dateArray.length !== 3) return slotDate; // Return original if format is wrong
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message || "Failed to load appointments");
        setAppointments([]);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to load appointments";
      toast.error(errorMessage);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    // Confirm cancellation
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.log("Cancel appointment error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to cancel appointment";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No appointments found</p>
            <p className="text-sm mt-2">Book an appointment to see it here</p>
          </div>
        ) : (
          appointments.map((item, index) => {
            const docData = item.docData || {};
            const address = docData.address || {};
            
            return (
              <div
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                key={item._id || index}
              >
                <div>
                  <img
                    className="w-32 bg-indigo-50"
                    src={docData.image || "https://via.placeholder.com/128"}
                    alt={docData.name || "Doctor"}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128";
                    }}
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {docData.name || "Unknown Doctor"}
                  </p>
                  <p>{docData.speciality || "General"}</p>
                  {address && (address.line1 || address.line2) && (
                    <>
                      <p className="text-zinc-700 font-medium mt-1">Address:</p>
                      {address.line1 && (
                        <p className="text-xs">{address.line1}</p>
                      )}
                      {address.line2 && (
                        <p className="text-xs">{address.line2}</p>
                      )}
                    </>
                  )}
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:
                    </span>{" "}
                    {slotDateFormat(item.slotDate)} | {item.slotTime || "N/A"}
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  {!item.cancelled && !item.isCompleted && (
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                      Pay Online
                    </button>
                  )}
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  )}
                  {item.cancelled && !item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                      Appointment cancelled
                    </button>
                  )}
                  {item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
