
import { useLocation, useNavigate } from "react-router-dom"
import { type Donation, useStateContext, type Campaign } from "../context";

import { thirdweb } from "../assets"
import { useEffect, useState } from "react";
import { calculateBarPercentage, daysLeft } from "../utils";
import { CountBox } from "../components/CountBox";
import { CustomButton } from "../components/CustomButton";
import { Loader } from "../components/Loader";

export function CampaignDetails() {
  const { getDonations, address, donate } = useStateContext()
  const location = useLocation();
  const navigate = useNavigate()

  const state = location.state as Campaign;

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState<Donation[]>([])

  const remainingDays = daysLeft(state.deadline)

  async function handleDonate() {
    setIsLoading(true)

    await donate(state.pId, amount)
    
    navigate('/')
    setIsLoading(false)
  }

  async function fetchDonators() {
    const data = await getDonations(state.pId)

    setDonators(data)
  }

  useEffect(() => {
    if (address) fetchDonators()
  }, [address])
  
  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img 
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl" 
          />

          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(Number(state.target), Number(state.amountCollected))}%`, maxWidth: '100%' }} />
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox 
            title="Days Left"
            value={remainingDays}
          />

          <CountBox 
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />

          <CountBox 
            title="total Backers"
            value={donators.length.toString()}
          />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-10">
          <div> 
            <h4 className="font-epilogue font-semibold text-lg text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img 
                  src={thirdweb}
                  alt="User"
                  className="w-[60%] h-[60%] object-contain" 
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-sm text-white break-all">{state.owner}</h4>
                <p className="mt-1 font-epilogue font-normal text-xs text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div> 
            <h4 className="font-epilogue font-semibold text-lg text-white uppercase">Story</h4>

            <div className="mt-5">
              <p className="font-epilogue font-normal text-base leading-[26px] text-justify text-[#808191]">{state.description}</p>
            </div>
          </div>

          <div> 
            <h4 className="font-epilogue font-semibold text-lg text-white uppercase">Donators</h4>

            <div className="mt-5 flex flex-col gap-4">
              { donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-base text-[#b2b3bd] break-all">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-base text-[#808191] break-all">{item.donation}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-base leading-[26px] text-justify text-[#808191]">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-lg text-white uppercase">Fund</h4>

          <div className="mt-5 flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-xl text-center text-[#808191]">
              Fund the campaign
            </p>

            <div className="mt-[30px]">
              <input 
                type="number" 
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-1 border-[#3a3a43] bg-transparent font-epilogue text-white text-lg placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-5 p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-sm text-white">Back it because you believe in it.</h4>
                <p className="mt-5 font-epilogue font-normal text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}