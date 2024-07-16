"use client";
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { App, ConfigProvider, Button, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Image from "next/image";
import dynamic from "next/dynamic";

const WheelComponent = dynamic(() => import("./component2"), {
  ssr: false,
})
const WheelPage = () => {
  const { width, height } = useWindowSize();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState("");
  const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);
  const [tipe, setTipe] = useState<any>("1");
  const [flag, setFlag] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [reset,setReset] = useState<any>(false)
  
  const [data, setData] = useState<any>([
    {
      option: "MOBIL INOVA",
      weight: 30,
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
      weight: 50,
      stock: 1,
    },
    {
      option: "JEPANG",
      weight: 90,
      stock: 1,
    },
    {
      option: "SPANYOL",
      weight: 10,
      stock: 1,
      style:null
    },
    
  ]);

  let spinAudio = new Audio("/spin-sound.mp3");
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
       // Urutkan berdasarkan bobot terbesar ke terkecil
        for (let i = 0; i < sortedData.length; i++) {
          // if (sortedData[i].option !== maxWeightOption.option) {
            adjustedRandom -= sortedData[i]?.weight;
            if (adjustedRandom < 0) {
              if((maxWeightOption.option === sortedData[i].option) && sortedData[i].stock <=0 ){
                return sortedData[sortedData.length - 2].option;
              }
              if(flag){
                return maxWeightOption.option
              }
              if((sortedData[i].option !== maxWeightOption.option) && click > 30){
                return maxWeightOption.option
              }else if(sortedData[i].option !== maxWeightOption.option){
                return sortedData[i].option
              }else {
                return sortedData[sortedData.length - 1];
              }
            }
          // }
        }
      };

      const newPrize = pickRandomOption();
      setPrizeNumber(newPrize);
      setMustSpin(true);
    }
  };

  const renderModal = () => {
    let findName = data?.find((item: any) => item?.option === prizeNumber);
    console.log(findName?.option,"sdsd")
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
          {findName?.stock < 0 ? "MAAF" : "Selamat Kamu Mendapat"}
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
          {findName?.stock < 0
            ? "Hadiah Habis"
            : findName?.option}
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

const segments = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
  ]
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const onFinished = (winner:string)=> {
    setReset(true)
    setOpen(true);
    setMustSpin(false);
    setFlag(false);
    localStorage.setItem("click", JSON.stringify(Number(click) + 1));

    setData(
      data.map((item: any, index: number) => {
        if (item.option === prizeNumber) {
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
    }
  const handleReset = () => {
    setReset(false)
  }
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
          <button className="absolute bottom-[21%] right-[34%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[5vw] h-[5vw] text-[6vw]  border-0  bg-transparent text-[transparent]" onClick={() => handleSetFlag()}>
            flag
          </button>
          )}
           
          <div className="absolute top-[37.5%] left-[49.5%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[76vw] h-[76vw] text-[6vw]  border-0 bg-transparent text-[transparent] z-50 rounded-full bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,1)]" />
          <div className="absolute top-[21.5%] right-[53%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[25vw] text-[3vw]  border-0 bg-transparent text-[transparent]">
            {loading? (
              "Loading..."
            ) : (
                <WheelComponent
                isSpinning={mustSpin}
                options={data}
                segColors={["#E0202A", "#0F6AA2"]}
                winningSegment={prizeNumber}
                onFinished={onFinished}
                primaryColor='white'
                reset={reset}
                contrastColor='white'
                outlineWidth={20}
                isOnlyOnce={false}
                size={1050}
                upDuration={2100}
                downDuration={13000}
                fontFamily='Arial'
              />
            )}
          </div>
          {(!mustSpin && !reset) && (
            <Button
              className="absolute bottom-[25%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[10vw] text-[6vw] font-bold rounded-[80px] bg-[#B0C4DE]  text-white  bg-gradient-to-tr from-[#60a1cb] to-[#16416C] border-[0.5vw]"
              onClick={handleSpinClick}
            >
              SPIN
            </Button>
          )}
            {(!mustSpin && reset) && (
            <Button
            danger
              className="absolute bottom-[25%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[25vw] h-[10vw] text-[6vw] font-bold rounded-[80px]  text-white    border-[0.5vw]"
              onClick={handleReset}
            >
              RESET
            </Button>
          )}
        </div>
        <Confetti width={width} height={height} />
      </App>
    </ConfigProvider>
  );
};

export default WheelPage;
