import copyImg from "../../assets/images/copy.svg";

import "./styles.scss";

type RoomCodeProps = {
  code: string;
}


export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="" />
      </div>
      <span>Room #{props.code}</span>
    </button>
  )
}