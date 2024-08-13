import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

// 1. 박스 2개 (타이틀, 사진, 결과값)
// 2. 가위, 바위, 보 버튼
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다
// 5. 3, 4의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 결과에 따라 박스 테두리 색이 바뀜(이기면 초록, 지면 빨강, 비기면 검정)

const choice = {
  rock: {
    name: "Rock",
    img: "https://korearps.wvy.kr/wp-content/uploads/sites/2/2020/03/slider-pic-104.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://korearps.wvy.kr/wp-content/uploads/sites/2/2020/03/slider-pic-103.png",
  },
  paper: {
    name: "Paper",
    img: "https://korearps.wvy.kr/wp-content/uploads/sites/2/2020/03/slider-pic-102.png",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [userResult, setUserResult] = useState("");
  const [computerResult, setComputerResult] = useState("");

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(choice[computerChoice]);
    let judgementResult = judgement(choice[userChoice], choice[computerChoice]);
    setUserResult(judgementResult.user);
    setComputerResult(judgementResult.computer);
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); // Object.keys() : 객체의 키 값만 뽑아서 배열로 만들어주는 함수
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return final;
  };

  const judgement = (user, computer) => {
    if (user.name === computer.name) {
      return { user: "Tie", computer: "Tie" };
    } else if (user.name === "Rock") {
      return computer.name === "Scissors"
        ? { user: "Win", computer: "Lose" }
        : { user: "Lose", computer: "Win" };
    } else if (user.name === "Scissors") {
      return computer.name === "Paper"
        ? { user: "Win", computer: "Lose" }
        : { user: "Lose", computer: "Win" };
    } else if (user.name === "Paper") {
      return computer.name === "Rock"
        ? { user: "Win", computer: "Lose" }
        : { user: "Lose", computer: "Win" };
    }
  };

  return (
    <div>
      <div className="header">가위 바위 보 게임!</div>
      <div className="semi-header">컴퓨터를 이겨라~ 가위! 바위! 보!</div>
      <div className="main">
        <Box title="YOU" item={userSelect} result={userResult} />
        <Box title="COMPUTER" item={computerSelect} result={computerResult} />
      </div>

      <div className="main">
        <button onClick={() => play("scissors")} className="button">
          가위
        </button>
        <button onClick={() => play("rock")} className="button">
          바위
        </button>
        <button onClick={() => play("paper")} className="button">
          보
        </button>
      </div>
    </div>
  );
}

export default App;
