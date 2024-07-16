"use client";
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { App, ConfigProvider, Button, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Image from "next/image";

const WheelPage = () => {
  const { width, height } = useWindowSize();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);
  const [tipe, setTipe] = useState<any>("1");
  const [flag, setFlag] = useState<any>(false);
  
  
  const [data, setData] = useState<any>([
    {
      option: "MOBIL INOVA",
      weight: 10,
      stock: 1,
    },
    {
      option: "MOTOR",
      weight: 20,
      stock: 1,
    },
    {
      option: "MANDALIKA",
      weight: 100,
      stock: 1,
    },
    {
      option: "INGGRIS",
      weight: 30,
      stock: 1,
    },
    {
      option: "JEPANG",
      weight: 40,
      stock: 1,
    },
    {
      option: "SPANYOL",
      weight: 50,
      stock: 1,
      style:null
    },
    {
      option: "ITALIA",
      weight: 60,
      stock: 1,
      style:null
    },
    {
      option: "KOREA",
      weight: 70,
      stock: 1,
      style:null
    },
    {
      option: "JAPAN",
      weight: 80,
      stock: 1,
      style:null
    },
    {
      option: "TURKI",
      weight: 90,
      stock: 1,
      style:null
    },
   
  ]);

  let spinAudio = new Audio("/body-spin.mp3");
  let winAudio = new Audio("/applouse.mp3");
  let loseAudio = new Audio("/ooh.mp3");
  useEffect(() => {
    let data = localStorage.getItem("data");
    let json: any = JSON.parse(data || "[]");
    json = json?.map((item: any) => {
      return {
        option: item?.option,
        weight: Number(item?.weight),
        stock: Number(item?.stock),
        style: item?.stock > 0 ? null : item?.style
      };
    });
    if (json?.length > 0) {
      setData(json);
    }
  }, [data?.length === 0]);

  useEffect(() => {
    let tipe = localStorage.getItem("tipe");
    setTipe(JSON.parse(tipe || "1"));
    let clik = localStorage.getItem("click");
    setClick(JSON.parse(clik || "0"));
  }, [open]);

  const router = useRouter();

  let totalWeight = data.reduce(
    (acc: any, option: any) => acc + option?.weight,
    0
  );
  const maxWeightOption = data.reduce((max: any, option:any) => {
    return option.weight > max.weight ? option : max;
  }, data[0]);
  console.log(flag)
  const handleSetFlag = () => {
    setFlag(true);
  }
  const sortedData = [...data].sort((a, b) => b?.weight - a?.weight); 
  
  const handleSpinClick = () => {
    spinAudio.play();
    setOpen(false);
    if (!mustSpin) {
      const pickRandomOption = () => {
        let random = Math.random() * totalWeight;
        let median = totalWeight / 2;
        if (random < median) {
          random = median + Math.random() * (totalWeight - median - 1);
        }
        let adjustedRandom = random;
        for (let i = 0; i < sortedData.length; i++) {
            adjustedRandom -= sortedData[i]?.weight;
            if (adjustedRandom < 0) {
              console.log(sortedData[i].option,sortedData[i].stock, maxWeightOption.option , sortedData[i].option ,"real")
              if((maxWeightOption.option === sortedData[i].option) && maxWeightOption.stock <=0 && click > 30){
               console.log("masuk1")
                return sortedData[sortedData.length - 2].option;
              }
              if(flag && maxWeightOption.stock > 0){
                return maxWeightOption.option
              }
              if((sortedData[i].option === maxWeightOption.option) && click < 30){
                console.log("masuk2")
                return sortedData[sortedData.length - (Math.floor(Math.random() * (sortedData.length/2))+1)].option
              }else if(sortedData[i].option !== maxWeightOption.option){
                console.log("masuk3")
                return sortedData[i].option
              } else {
                console.log("masuk4")
                return sortedData[i].option;
              }
            }
        }
      };

      const newPrize = pickRandomOption();
      console.log(newPrize,'output')
      let findIndex = data.findIndex((item: any) => item.option === newPrize);
      
      if(findIndex === -1){
        setPrizeNumber(2);
      }
      setPrizeNumber(findIndex);
      setMustSpin(true);
    }
  };

  const renderModal = () => {
    return (
      <Modal
        className="text-center flex flex-col justify-center items-center "
        open={open}
        closeIcon={null}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        <Image src="/logo.png" width={200} height={200} alt="confetti" />
        <Typography.Title
          level={1}
          className="text-[10vw] text-white"
          style={{ fontSize: "5vw", color: "white" }}
        >
          {data[prizeNumber]?.stock < 0 ? "MAAF" : "Selamat Kamu Mendapat"}
        </Typography.Title>

        <Typography.Title
          level={2}
          style={{
            fontSize: "5vw",
            color: "white",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {data[prizeNumber]?.stock < 0
            ? "Hadiah Habis"
            : data[prizeNumber]?.option}
        </Typography.Title>
        <Typography.Paragraph
          className="text-[10vw] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] box-shadow-2xl space-x-3 text-white"
          style={{ fontSize: "5vw", color: "white" }}
        >
          Terimakasih Sobat Pertamina
        </Typography.Paragraph>
      </Modal>
    );
  };


  useEffect(() => {
    if (open) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [open]);
  const handleSetting = () => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count === 3) {
        clearInterval(interval);
        router.push("/setting");
      }
    }, 3000);
  };
let backgroundColor = tipe == "1" ? ["#E0202A", "#0F6AA2"] : ["#E0202A", "#FFB22C"];

  return (
    <ConfigProvider>
      <App>
        {renderModal()}
        <div className="w-full h-screen flex flex-col justify-center items-center  bg-cover bg-[url('/image/bg.png')] bg-no-repeat bg-center bg-fixed bg-scroll relative">
          <button
            className="absolute top-[6%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[25vw] text-[6vw]  border-0 bg-transparent text-[transparent]"
            onClick={() => handleSetting()}
          >
            Setting
          </button>
          {!flag  &&(
            
          <button className="absolute bottom-[22%] right-[36%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[5vw] h-[5vw] text-[6vw]  border-0  bg-transparent text-[transparent]" onClick={() => handleSetFlag()}>
            flag
          </button>
          )}
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
                backgroundColors={backgroundColor}
                textColors={["#FFFFFF", "#FFFFFF"]}
                pointerProps={{ src: "/image/roulette-pointer.png" }}
                disableInitialAnimation={true}
                onStopSpinning={() => {
                  setOpen(true);
                  setMustSpin(false);
                  setFlag(false);
                  localStorage.setItem("click", JSON.stringify(Number(click) + 1));

                  setData(
                    data.map((item: any, index: number) => {
                      if (index === prizeNumber) {
                        if (item.stock > 1) {
                          winAudio.play();

                          return {
                            ...item,
                            stock: item.stock - 1,
                          };
                        } else if (item.stock === 1) {
                          winAudio.play();
                          return {
                            ...item,
                            stock: 0,
                            style: {
                              backgroundColor: "#A0A0A0",
                            },
                          };
                        } else if (item.stock === 0) {
                          loseAudio.play();
                          return {
                            ...item,
                            stock: item.stock - 1,
                            style: {
                              backgroundColor: "#A0A0A0",
                            },
                          };
                        } else {
                          loseAudio.play();
                          return item;
                        }
                      } else {
                        return item;
                      }
                    })
                  );
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
