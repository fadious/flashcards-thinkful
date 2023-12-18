import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function Decks() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchData() {
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            }
            catch (error) {
                console.error("Something went wrong", error);
            }
        }
        fetchData();
        return () => {
            abortController.abort();
        };
    }, []);

    async function handleDelete(deck) {
        if (window.confirm("Delete this deck? You will not be able to recover it")) {
            const abortController = new AbortController();
            try {
                history.go(0);
                return await deleteDeck(deck.id, abortController.signal);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    return (
        <div className="container">
            <Link className="btn btn-secondary mb-2" to="/decks/new">
                Create Deck
            </Link>
            {decks.map((deck) => {
                return (
                    <div className="card" key={deck.id}>
                        <div className="card-body">
                            <h5 className="card-title">{deck.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {deck.cards.length} cards
                            </h6>
                            <p className="card-text">{deck.description}</p>
                            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                                <span className="oi oi-eye" /> View
                            </Link>
                            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                                <span className="oi oi-book" /> Study
                            </Link>
                            <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(deck)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Decks;