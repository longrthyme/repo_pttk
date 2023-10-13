import React from "react";
import CardStats from "../Card/CardStats";

export default function HeaderStats(props) {

    const {data} = props;
    console.log("Value data is ", JSON.stringify(data));
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Đơn hàng chờ xử lý"
                  statTitle={data.pending ? data.pending : 0}
                  statArrow="up"
                  statPercent="0"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Waiting orders"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Đơn hàng bị huỷ"
                  statTitle={data.cancel ? data.cancel : 0}
                  statArrow="down"
                  statPercent="0"
                  statPercentColor="text-red-500"
                  statDescripiron="Canceled orders"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Doanh thu hôm nay"
                  statTitle={data.today ? (data.today).toFixed(2) : 0}
                  statArrow="down"
                  statPercent="0"
                  statPercentColor="text-orange-500"
                  statDescripiron="Revenue"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Doanh thu tuần này"
                  statTitle={data.week ? (data.week).toFixed(2) : 0}
                  statArrow="up"
                  statPercent="0"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-percent"
                  statIconColor="bg-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}