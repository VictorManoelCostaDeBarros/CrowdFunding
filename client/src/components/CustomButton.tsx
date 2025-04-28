
type Props = {
  btnType: "button" | "submit" | "reset" | undefined
  title: string
  styles: string
  handleClick: () => void;
}

export function CustomButton({btnType, title, styles, handleClick }: Props) {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-base leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] cursor-pointer ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}