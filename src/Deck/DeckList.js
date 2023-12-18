import React from 'react';
import { Link } from 'react-router-dom';

function DeckList({ decks, setDecks }) {
    const deleteDeck = async (id) => {
        if (window.confirm('Delete this deck? You will not be able to recover it.')) {
            // Call your API to delete the deck here
            // Then update the state
            setDecks(decks.filter(deck => deck.id !== id));
        }
    };

    return (
        <div className="card">
            {decks.map((deck) => (
                <div key={deck.id} className="card-body">
                    <h3 className="card-title">{deck.name}</h3>
                    <p className="card-text">{deck.description}</p>
                    <Link className="btn btn-secondary mx-1" to={`/decks/${deck.id}`}>View</Link>
                    <Link className="btn btn-primary mx-1" to={`/decks/${deck.id}/study`}>Study</Link>
                    <button className="btn btn-danger mx-1" onClick={() => deleteDeck(deck.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default DeckList;