"use client";
import { useState, useEffect, useRef } from "react";
import { Wheel } from "@/public/dist/components/Wheel/index";
import { App, ConfigProvider, Button, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Image from "next/image";
// const data = [
//   { option: "0", style: { backgroundColor: "green", textColor: "black" } },
//   { option: "1", style: { backgroundColor: "white" } },
//   { option: "2" },
// ];

const WheelPage = () => {
  const { width, height } = useWindowSize();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([
    {
      option: "MOBIL INOVA",
      style: { backgroundColor: "#E0202A", textColor: "white" },
      weight: 3,
      stock: 1,
    },
    {
      option: "MOTOR",
      style: { backgroundColor: "#0F6AA2", textColor: "white" },
      weight: 1,
      stock: 1,
    },
    {
      option: "MANDALIKA",
      style: { backgroundColor: "#E0202A", textColor: "white" },
      weight: 2,
      stock: 1,
    },
    {
      option: "INGGRIS",
      style: { backgroundColor: "#0F6AA2", textColor: "white" },
      weight: 5,
      stock: 1,
    },
    {
      option: "JEPANG",
      style: { backgroundColor: "#E0202A", textColor: "white" },
      weight: 9,
      stock: 1,
    },
    {
      option: "SPANYOL",
      style: { backgroundColor: "#0F6AA2", textColor: "white" },
      weight: 10,
      stock: 1,
    },
  ]);
  let spinAudio = new Audio("/body-spin.mp3");
  let winAudio = new Audio("/applouse.mp3");
  useEffect(() => {
    let data = localStorage.getItem("data");
    let json: any = JSON.parse(data || "[]");
    json = json?.map((item: any) => {
      return {
        option: item?.option,
        style: item?.style,
      };
    });
    if (json?.length > 0) {
      setData(json);
    }
  }, [data?.length === 0]);

  useEffect(() => {
    let clik = localStorage.getItem("click");
    setClick(JSON.parse(clik || "0"));
  }, []);

  const router = useRouter();

  let totalWeight = data.reduce(
    (acc: any, option: any) => acc + option.weight,
    0
  );
  const handleSpinClick = () => {
    spinAudio.play();
    localStorage.setItem("click", JSON.stringify(click + 1));
    setOpen(false);
    if (!mustSpin) {
      const pickRandomOption = () => {
        let random = Math.random() * totalWeight;
        let median = totalWeight / 2;
        console.log(median);
        console.log(random < median);
        if (random < median) {
          random = median + Math.random() * (totalWeight - median - 1);
        }
        let adjustedRandom = random;
        const sortedData = [...data].sort((a, b) => b.weight - a.weight); // Urutkan berdasarkan bobot terbesar ke terkecil
        for (let i = 0; i < sortedData.length; i++) {
          adjustedRandom -= sortedData[i].weight;
          if (adjustedRandom < 0) {
            // kurangin stock dulu
            sortedData[i].stock = sortedData[i].stock - 1;

            return sortedData[i].option; // Mengembalikan opsi yang dipilih
          }
        }
      };

      const newPrize = pickRandomOption();
      let findIndex = data.findIndex((item: any) => item.option === newPrize);
      setPrizeNumber(findIndex + 1);
      setMustSpin(true);
    }
  };

  const renderModal = () => {
    return (
      <Modal
        className="text-center flex flex-col justify-center items-center bg-[#E0202A]"
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Image src="/logo.png" width={200} height={200} alt="confetti" />
        <Typography.Title
          level={1}
          className="text-[10vw] text-white"
          style={{ fontSize: "5vw", color: "white" }}
        >
          Selamat Kamu Mendapat
        </Typography.Title>
          
        <Typography.Title
          level={2}
          style={{ fontSize: "5vw", color: "white" }}
        >
          "{data[prizeNumber]?.option}"
        </Typography.Title>
        <Typography.Title
          level={3}
          className="text-[10vw]"
          style={{ fontSize: "5vw", color: "#E0202A" }}
        >
          Terimakasih Sobat Pertamina
        </Typography.Title>
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
          {/* <StarFilled 
            className="absolute top-[38%] right-[40%] transform -translate-x-1/2 -translate-y-1/2 z-[99999999999999999]  text-[10vw]  "
          /> */}
          <div className="absolute top-[37%] right-[45.5%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[5vw] h-[5vw] text-[10vw]  border-0 bg-white rounded-full z-[999] drop-shadow-[0_35px_35px_rgba(0,0,0,1)]" />
          <div className="absolute top-[37.5%] left-[49.5%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[76vw] h-[76vw] text-[6vw]  border-0 bg-transparent text-[transparent] z-50 rounded-full bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,1)]" />
          <div className="absolute top-[22%] right-[53%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[25vw] text-[6vw]  border-0 bg-transparent text-[transparent]">
            {data?.length === 0 ? (
              "Loading..."
            ) : (
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                spinDuration={1}
                outerBorderColor="#FFFFFF"
                outerBorderWidth={15}
                radiusLineColor="#FFFFFF"
                radiusLineWidth={0}
                textDistance={55}
                pointerProps={{ src: "/image/roulette-pointer.png" }}
                disableInitialAnimation={true}
                onStopSpinning={() => {
                  setOpen(true);
                  setMustSpin(false);
                  winAudio.play();
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
        <Confetti width={width} height={height} />
      </App>
    </ConfigProvider>
  );
};

export default WheelPage;
