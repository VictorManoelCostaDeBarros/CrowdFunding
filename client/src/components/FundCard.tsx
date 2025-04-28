import type { Campaign } from "../context";

import { tagType, thirdweb } from "../assets"
import { daysLeft } from "../utils";

type Props = Campaign & {
  handleClick: () => void;
}


export function FundCard({ title, description, category, amountCollected, deadline, image, owner, target, handleClick }: Props) {
  const remainingDays = daysLeft(deadline)

  return (
    <button 
      type="button" 
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img 
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]" 
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
          <p className="ml-3 mt-[2px] font-epilogue font-medium capitalize text-xs text-[#808191]">{category}</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-base text-white text-left truncate">{title}</h3>
          <p className="mt-1 font-epilogue font-normal text-xs text-[#808191] text-left truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col text-left">
            <h4 className="font-epilogue font-semibold text-sm text-[#b2b3bd]">{amountCollected}</h4>
            <p className="mt-1 font-epilogue font-normal text-xs text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
          </div>

          <div className="flex flex-col text-left">
            <h4 className="font-epilogue font-semibold text-sm text-[#b2b3bd]">{remainingDays}</h4>
            <p className="mt-1 font-epilogue font-normal text-xs text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
        </div>
      </div>
    </button>
  )
}