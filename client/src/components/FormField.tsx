import type { ChangeEventHandler } from "react"

type Props = {
  labelName: string
  placeholder: string
  inputType?: string
  value: string
  isTextarea?: boolean
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export function FormField({ labelName, placeholder, inputType, value, isTextarea = false, handleChange }: Props) {
  return (
    <label
      className="flex-1 w-full flex flex-col"
      htmlFor=""
    >
      {labelName && (
        <span className="font-epilogue font-medium text-sm text-[#808191] mb-[10px]">{labelName}</span>
      )}

      {isTextarea ? (
        <textarea 
        required
        value={value}
        rows={10}
        onChange={handleChange}
        placeholder={placeholder}
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border-1 border-[#3a3a43] bg-transparent font-epilogue text-white text-sm placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-1 border-[#3a3a43] bg-transparent font-epilogue text-white text-sm placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}