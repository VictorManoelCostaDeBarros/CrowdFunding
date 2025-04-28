import { useEffect, useState } from "react"
import { type Campaign, useStateContext } from "../context"
import { DisplayCampaigns } from "../components/DisplayCampaigns"

export function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  const { address, getCampaigns } = useStateContext()

  async function fetchCampaigns() {
    setIsLoading(true)
    const data = await getCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (address) fetchCampaigns()
  }, [address])

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns || []}
    />
  )
}