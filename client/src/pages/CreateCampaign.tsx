
import { useNavigate } from "react-router-dom"
import { money} from "../assets"
import { type ChangeEvent, type FormEvent, useState } from "react"
import { FormField } from "../components/FormField"
import { CustomButton } from "../components/CustomButton"
import { useStateContext } from "../context"
import { parseEther } from "viem"
import { checkIfImage } from "../utils"
import { Loader } from "../components/Loader"

export function CreateCampaign() {
  const navigate = useNavigate()

  const { createCampaign } = useStateContext()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    category: '',
    target: '',
    deadline: '',
    image: ''
  })

  function handleFormFieldChange(fieldName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [fieldName]: e.target.value
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    checkIfImage(form.image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: parseEther(form.target)})
        setIsLoading(false)
        navigate('/')
      } else {
        alert("Provide valid image URL")
        setForm({...form, image: ''})
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {
        isLoading && <Loader />
      }

      <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-2xl text-lg leading-9 text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-10">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          /> 

          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          /> 

          <FormField 
            labelName="Campaign Category *"
            placeholder="Write a category"
            inputType="text"
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
          /> 
        </div>


        <FormField 
          labelName="Story *"
          placeholder="Write your story"
          isTextarea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        /> 

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img 
            src={money} 
            alt="money"
            className="w-10 h-10 object-contain" 
          />
          <h4 className="font-epilogue font-bold text-2xl text-white ml-5">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-10">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          /> 

          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          /> 
        </div>

        <FormField 
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        /> 

        <div className="flex justify-center items-center mt-10">
          <CustomButton 
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            handleClick={() => {}}
          />
        </div>

      </form>
    </div>
  )
}