import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function Price() {
  const [date, setDate] = useState("");
  const [crop, setCrop] = useState("");
  const [categories, setCategories] = useState([]);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [selectedDatePrice, setSelectedDatePrice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setError("Failed to load crop categories."));
  }, []);

  const getLast7Days = (selectedDate) => {
    const dates = [];
    const baseDate = new Date(selectedDate);
    for (let i = 6; i >= 0; i--) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  const getMonthlyDates = (selectedDate) => {
    const dates = [];
    const baseDate = new Date(selectedDate);
    const day = baseDate.getDate();
    for (let i = 0; i < 12; i++) {
      const d = new Date(baseDate);
      d.setMonth(d.getMonth() - i);
      d.setDate(day);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates.reverse();
  };

  const fetchPrices = async (dates, label) => {
    const response = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates, crop }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`${label} - ${errText}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSelectedDatePrice(null);
    setWeeklyData(null);
    setMonthlyData(null);
    setLoading(true);

    const weeklyDates = getLast7Days(date);
    const monthlyDates = getMonthlyDates(date);

    try {
      const [weeklyRes, monthlyRes] = await Promise.all([
        fetchPrices(weeklyDates, "Weekly"),
        fetchPrices(monthlyDates, "Monthly"),
      ]);

      const selectedDayData = weeklyRes.prices.find(
        (item) => item.date === date
      );
      setSelectedDatePrice(selectedDayData);

      const formatChartData = (data) => ({
        labels: data.prices.map((item) => item.date),
        datasets: [
          {
            label: "Min Price (₹)",
            data: data.prices.map((item) => item.min),
            borderColor: "rgb(34,197,94)",
            backgroundColor: "rgba(34,197,94,0.1)",
          },
          {
            label: "Max Price (₹)",
            data: data.prices.map((item) => item.max),
            borderColor: "rgb(239,68,68)",
            backgroundColor: "rgba(239,68,68,0.1)",
          },
          {
            label: "Modal Price (₹)",
            data: data.prices.map((item) => item.modal),
            borderColor: "rgb(59,130,246)",
            backgroundColor: "rgba(59,130,246,0.1)",
          },
        ],
      });

      setWeeklyData(formatChartData(weeklyRes));
      setMonthlyData(formatChartData(monthlyRes));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <NavBar />
      <Banner items={["Home", "Services", "Market Price Prediction"]} />
      {loading ? (
        <div className="flex justify-center  items-center h-96">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          <div> <p className="ml-4 text-lg">Loading...</p></div>
        </div>
      ) : (
        <div className="flex justify-center w-[90%] mx-auto">
          <div className="w-full p-6">
            <div className="flex  gap-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 w-full rounded border shadow mb-4"
              >
                <div className="mb-4">
                  <label htmlFor="date" className="block font-medium mb-1">
                    Enter Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="crop" className="block font-medium mb-1">
                    Select Crop:
                  </label>
                  <select
                    id="crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">-- Select Crop --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Predicting..." : "Predict Price"}
                </button>
              </form>

              {selectedDatePrice && (
                <div className="w-2/4">
                  <div className="bg-white p-6 rounded border shadow mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      📅 Price on {selectedDatePrice.date}
                    </h2>
                    <div className="grid grid-row-3 gap-4 ">
                      {["min", "max", "modal"].map((type) => {
                        const todayValue = selectedDatePrice[type];

                        // Get dataset for this price type
                        const dataset = weeklyData?.datasets.find((d) =>
                          d.label.toLowerCase().includes(type)
                        );
                        const data = dataset?.data || [];

                        // Ensure we have enough data for comparison
                        const yesterdayValue =
                          data.length >= 2 ? data[data.length - 2] : null;
                        const hasChange =
                          yesterdayValue !== null && yesterdayValue !== 0;

                        const difference = hasChange
                          ? todayValue - yesterdayValue
                          : 0;
                        const percentageChange = hasChange
                          ? ((difference / yesterdayValue) * 100).toFixed(2)
                          : "0.00";

                        const isProfit = difference > 0;
                        const isLoss = difference < 0;
                        const ArrowIcon = isProfit ? "▲" : isLoss ? "▼" : "";
                        const changeColor = isProfit
                          ? "text-green-500"
                          : isLoss
                          ? "text-red-500"
                          : "text-gray-500";

                        const colorClass = "text-black";

                        return (
                          <div key={type}>
                            <p className="text-gray-500">
                              {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                              Price
                            </p>
                            <div className="flex items-center gap-3">
                              <p className={`text-lg font-bold ${colorClass}`}>
                                ₹{todayValue}
                              </p>
                              {hasChange && (
                                <p
                                  className={`text-sm font-semibold ${changeColor}`}
                                >
                                  {ArrowIcon} {Math.abs(percentageChange)}%
                                  {isProfit ? " Profit" : isLoss ? " Loss" : ""}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              {weeklyData && (
                <div className="bg-white w-1/2 p-6 rounded shadow mb-4">
                  <h2 className="text-xl font-semibold mb-4">
                    📊 Weekly Price Comparison(Past 6 Days)
                  </h2>
                  <Line data={weeklyData} />
                </div>
              )}

              {monthlyData && (
                <div className="bg-white w-1/2 p-6 rounded shadow mb-4">
                  <h2 className="text-xl font-semibold mb-4">
                    📆 Monthly Price Comparison (Same Day Each Month)
                  </h2>
                  <Line data={monthlyData} />
                </div>
              )}
            </div>
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded shadow">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Price;
