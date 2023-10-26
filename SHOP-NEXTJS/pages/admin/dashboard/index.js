import HeaderStats from "@/components/Header/HeaderStats";
import { OverviewSales } from "@/components/Overview/OverviewSales";
import SpinTip from "@/components/loading/SpinTip";
import { API_URL, NEXT_API } from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Bar, Doughnut } from "react-chartjs-2";
import MonthRevenue from "@/components/Dashboard/MonthRevenue";
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};



function Dashboard(props) {
  const [loading, setLoading] = useState(true);

  const [report, setReport] = useState(null);
  const [category, setCategory] = useState(null);

  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);

        const response = await fetch(`${API_URL}/admin/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const restData = await response.json();

        console.log("Resdata dash " + JSON.stringify(restData));
        if (!response.ok) {
          toast.error("Error" + restData.message);
        } else {
          setReport(restData?.report);
          setCategory(restData?.category);

          setLoading(false);
        }
      })();
    }
  }, [token]);

  const data = {
    labels: category && category.map((o) => o.name),
    datasets: [
      {
        label: "# of Votes",
        data: category && category.map((o) => o.revenue),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (status === "loading") {
    return <SpinTip />;
  } else
    return (
      <div>
        {
          report && <HeaderStats data={report} />
        }

        {category && (
          <Grid item xs={6}>
            <div className="h-3/12 w-3/12 ml-2 mt-8">
              <p className="font-semibold opacity-70">Top seller category</p>
              <Doughnut data={data} options={options} />
            </div>
          </Grid>
        )}

<MonthRevenue />

        {/* <Grid container className="mt-10">
        <Grid item xs={6}>
          <OverviewSales
            chartSeries={[
              {
                name: "This year",
                data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
              },
              {
                name: "Last year",
                data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
              },
            ]}
            sx={{ height: "100%" }}
          />
        </Grid>

        <Grid item xs={6} >
          <div className="h-8/12 w-8/12 ml-2">
            <p className="font-semibold opacity-70">Top seller category</p>
            {loading ? (
              <SpinTip />
            ) : category ? (
              <Doughnut data={data} options={options}  />
            ) : (
              ""
            )}
          </div>
        </Grid>
      </Grid> */}
      </div>
    );
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
