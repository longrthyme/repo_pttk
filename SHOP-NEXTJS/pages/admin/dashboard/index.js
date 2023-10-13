import HeaderStats from "@/components/Header/HeaderStats";
import { OverviewSales } from "@/components/Overview/OverviewSales";
import SpinTip from "@/components/loading/SpinTip";
import { NEXT_API } from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSession } from "next-auth/react";
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

  
  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);


  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await fetch(`${NEXT_API}/api/dashboard`, {
        method: "GET",
      });

      const restData = await response.json();
      if (!response.ok) {
        toast.error("Error" + restData.message);
      } else {
        setReport(restData.dashboard.report);
        setCategory(restData.dashboard.category);

        setLoading(false);
      }
    })();
  }, []);

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

  return (
    <div>
      {loading ? <SpinTip /> : report ? <HeaderStats data={report} /> : ""}

      <Grid container className="mt-10">
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
            <h2 className="font-semibold opacity-70">Top seller category</h2>
            {loading ? (
              <SpinTip />
            ) : category ? (
              <Doughnut data={data} options={options}  />
            ) : (
              ""
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
