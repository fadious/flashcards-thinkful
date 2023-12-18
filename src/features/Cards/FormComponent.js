import React from "react";

function FormComponent({ card, handleChange, handleSubmit, deckName, buttonText }) {
    return (
        <form onSubmit={handleSubmit}>
            <h2>{deckName}: {buttonText}</h2>
            <div className="form-group">
                <label>Front</label>
                <textarea
                    id="front"
                    name="front"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={card.front}
                />
            </div>
            <div className="form-group">
                <label>Back</label>
                <textarea
                    id="back"
                    name="back"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={card.back}
                />
            </div>
            <button type="submit" className="btn btn-primary">{buttonText}</button>
        </form>
    );
}

export default FormComponent;
