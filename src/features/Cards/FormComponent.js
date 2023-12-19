import React from "react";

function FormComponent({ card, handleChange, handleSubmit, handleDone, deckName, buttonText, doneButtonText }) {
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

            <button type="button" className="btn btn-secondary" style={{ marginRight: '10px' }} onClick={handleDone}>{doneButtonText}</button>
            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>{buttonText}</button>
        </form>
    );
}

export default FormComponent;
