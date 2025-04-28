import { useEffect, useState } from "react"
import { type Campaign, useStateContext } from "../context"
import { DisplayCampaigns } from "../components/DisplayCampaigns"

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  const { address, getUserCampaigns } = useStateContext()

  async function fetchCampaigns() {
    setIsLoading(true)
    const data = await getUserCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (address) fetchCampaigns()
  }, [address])

  return (
    <DisplayCampaigns 
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns || []}
    />
  )
}