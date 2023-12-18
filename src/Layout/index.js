import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

import { listDecks } from '../utils/api/index';
import { useState, useEffect } from 'react';
import DeckList from "../Deck/DeckList";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch((error) => console.log(error));
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div>
          <button className="btn btn-secondary mb-2" onClick={() => window.location.href = "/decks/new"}>Create Deck</button>
          <DeckList decks={decks} setDecks={setDecks} />
        </div>
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
