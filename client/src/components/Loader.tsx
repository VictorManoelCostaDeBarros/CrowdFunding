import {loader} from "../assets"

export function Loader() {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img 
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain" 
      />
      <p className="mt-5 font-epilogue font-bold text-xl text-white text-center">
        Transaction is in progress <br />
        Please wait...
      </p>
    </div>
  )
}