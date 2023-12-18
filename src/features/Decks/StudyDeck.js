import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index";

function StudyDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, isFront] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                setCards(response.cards);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    function nextCard(index, total) {
        if (index < total) {
            setCardNumber(cardNumber + 1);
            isFront(true);
        } else {
            if (window.confirm("Restart cards?")) {
                setCardNumber(1);
                isFront(true);
            }
        }
    }

    function flipCard() {
        isFront(!front);
    }

    function showNextButton(cards, index) {
        if (front) {
            return null;
        } else {
            return (
                <button onClick={() => nextCard(index + 1, cards.length)} className="btn btn-primary mx-1">
                    Next
                </button>
            );
        }
    }

    function enoughCards() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {`Card ${cardNumber} of ${cards.length}`}
                    </h5>
                    <p className="card-text">
                        {front ? cards[cardNumber - 1].front : cards[cardNumber - 1].back}
                    </p>
                    <button onClick={flipCard} className="btn btn-secondary mx-1">
                        Flip
                    </button>
                    {showNextButton(cards, cardNumber - 1)}

                </div>
            </div>
        );
    }

    function notEnoughCards() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There are {cards.length}{" "} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
                    Add Cards
                </Link>
            </div>
        );
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
            <div>
                <h2>{`${deck.name}: Study`}</h2>
                <div>
                    {cards.length === 0 ? notEnoughCards() : cards.length > 2 ? enoughCards() : notEnoughCards()}
                </div>
            </div>
        </div>
    );
}

export default StudyDeck;