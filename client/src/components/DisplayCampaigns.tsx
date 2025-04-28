import { useNavigate } from "react-router-dom"
import type { Campaign } from "../context"

import { loader } from "../assets"
import { FundCard } from "./FundCard"

type Props = {
  title: string
  isLoading: boolean
  campaigns: Array<Campaign>
}

export function DisplayCampaigns({ title, isLoading, campaigns }: Props) {
  const navigate = useNavigate()

  function handleNavigate(campaign: Campaign) {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-lg text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-5 gap-6">
        {isLoading && (
          <img 
            src={loader} 
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-sm text-[#818183]">
            You have not created any campaigns yet.
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map(campaign => 
          <FundCard 
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        )}
      </div>
    </div>
  )
}