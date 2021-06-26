import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import "../styles/auth.scss";


export function NewRoom() {
  const {user} = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push('/rooms/'+firebaseRoom.key);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Q and A illustration" />
        <strong>Create live Q&amp;A chatting rooms</strong>
        <p>Chat and answer questions in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Pergunta Pro Pai" />
          <h2>Create new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Create room
            </Button>
          </form>
          <p>
            <a href="/">Join an existing room</a>
          </p>
        </div>
      </main>
    </div>
  )
}
