"use client";
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { App, ConfigProvider, Button, Modal } from "antd";
import { useRouter } from "next/navigation";
// const data = [
//   { option: "0", style: { backgroundColor: "green", textColor: "black" } },
//   { option: "1", style: { backgroundColor: "white" } },
//   { option: "2" },
// ];

const WheelPage = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([
    { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  ]);
  
  useEffect(() => {
    let data = localStorage.getItem("data")
    let json:any = JSON.parse(data || "[]")
    // buang object stock
    json = json?.map((item:any) => {
      return {
        option: item?.option,
        style: item?.style
      }
    })
    if (json?.length > 0) {
    setData(json)
    }
  },[data?.length===0]);

  const router = useRouter();
  const handleSpinClick = () => {
    setOpen(false);
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const renderModal = () => {
    return (
      <Modal
        title="Prize"
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        {/* putal audio menang */}
        <p>Prize number: {prizeNumber}</p>
      </Modal>
    );
  };
  const handleSetting = () => {
    // jika sudah dua kali dalam 3 detik maka route ke setting
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count === 3) {
        clearInterval(interval);
        router.push("/setting");
      }
    }, 3000);
  };

  return (
    <ConfigProvider>
      <App>
        {renderModal()}
        <div className="w-full h-screen flex flex-col justify-center items-center  bg-cover bg-[url('/image/bg.jpeg')] bg-no-repeat bg-center bg-fixed bg-scroll relative">
          <button
            className="absolute top-[6%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[25vw] text-[6vw]  border-0 bg-transparent text-[transparent]"
            onClick={() => handleSetting()}
          >
            Setting
          </button>
          <div className="absolute top-[22%] right-[53%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[25vw] text-[6vw]  border-0 bg-transparent text-[transparent]">
            {data?.length === 0 ? "Loading..." : (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor="#0FAAEA"
              outerBorderWidth={15}
              radiusLineColor="#0FAAEA"
              radiusLineWidth={15}
              onStopSpinning={() => {
                setOpen(true);
                setMustSpin(false);
              }}
            />
            )}
          </div>
          {!mustSpin && (
            <Button
              className="absolute bottom-[25%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[10vw] text-[6vw] font-bold rounded-[80px] bg-[#B0C4DE]  text-white  bg-gradient-to-tr from-[#60a1cb] to-[#16416C] border-[0.5vw]"
              onClick={handleSpinClick}
            >
              SPIN
            </Button>
          )}
        </div>
      </App>
    </ConfigProvider>
  );
};

export default WheelPage;
