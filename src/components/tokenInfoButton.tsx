interface TokenInfoButtonProps {
  onClick: () => void;
}

export function TokenInfoButton({ onClick }: TokenInfoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="font-bold  rounded-[25px] h-[45px] 2xl:!h-[4.5rem] 2xl:text-[2rem]  border-blue-500 border-[1px] items-center  "
    >
      View Token Info
    </button>
  );
}