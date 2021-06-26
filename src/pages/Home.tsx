import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import {Button} from "../components/Button";

import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import "../styles/auth.scss";


export function Home() {
  const history = useHistory();

  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('This room does not exist');
      return;
    }

    if (roomRef.val().endedAt) {
      alert("This room is already closed");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration image" />
        <strong>Create live Q&amp;A chatting rooms</strong>
        <p>Chat and answer questions in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Pergunta Pro Pai" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google icon image" />
            Sign in with Google
          </button>
          <div className="separator">or join a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type the room code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Join room
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
