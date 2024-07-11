"use client"
import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { App, ConfigProvider, Button, Modal } from 'antd'
const data = [
  { option: '0' },
  { option: '1' },
  { option: '2' },
  { option: '3' },
  { option: '4' },
  { option: '5' },
  { option: '6' },
]

export default () => {
  const { modal } = App.useApp()
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(prizeNumber, false)
  const handleSpinClick = () => {
    setOpen(false);
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

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
    )
  }
  
  return (
    <ConfigProvider>
      <App>
        {renderModal()}
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
         setOpen(true);
        }}
      />
      <Button onClick={handleSpinClick}>SPIN</Button>
    </div>
    </App>
    </ConfigProvider>
  )
}