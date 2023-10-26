import { Grid } from "antd";
import { Doughnut } from "react-chartjs-2";

// const TopCategory = ({data}) => {

//     const options = {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: "bottom",
//           },
//           title: {
//             display: true,
//             text: "Chart.js Line Chart",
//           },
//         },
//       };

//     return (

//         <Grid item xs={6} >
//         <div className="h-5/12 w-5/12 ml-2">
//           <p className="font-semibold opacity-70">Top seller category</p>
//           <Doughnut data={data} options={options}  />
//         </div>
//       </Grid>

//     )
// }

// export default TopCategory;

export 
    
const options = {
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


function TopCategory({data}) {

  return (
    <Grid item xs={6}>
      <div className="h-5/12 w-5/12 ml-2">
        <p className="font-semibold opacity-70">Top seller category</p>
        <Doughnut data={data} options={options} />
      </div>
    </Grid>
  );
}

export default TopCategory;
