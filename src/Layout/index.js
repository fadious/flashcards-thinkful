import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

import { listDecks } from "../utils/api";
import { Switch, Route } from "react-router-dom";

import Decks from "../features/Decks/Decks";
import CreateDeck from "../features/Decks/CreateDeck";
import Deck from "../features/Decks/Deck";
import EditDeck from "../features/Decks/EditDeck";
import StudyDeck from "../features/Decks/StudyDeck";
import AddCard from "../features/Cards/AddCard";
import EditCard from "../features/Cards/EditCard";

function Layout() {
  const [decks, setDecks] = React.useState([]);

  React.useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
          <Switch>
            <Route exact path="/">
              <Decks decks={decks} />
            </Route>
            <Route path="/decks/new">
              <CreateDeck />
            </Route>
           <Route exact path="/decks/:deckId">
              <Deck />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route path="/decks/:deckId/study">
              <StudyDeck />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
      </div>
    </>
  );
}

export default Layout;
