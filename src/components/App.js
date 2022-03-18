import Die from "./Die";
import { useState, useEffect } from 'react';

import Confetti from "react-confetti";

function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const test = dice.every(val => val.isHeld === true && val.value === dice[0].value);

        if (test) {
            setTenzies(true);
        }
    }, [dice]);


    function allNewDice() {
        const random = [];
        for (let i = 0; i < 10; i++) {
            random.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: i
            });

        }
        return random;
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map((dice, index) => {
                return dice.isHeld === true ?
                    dice :
                    {
                        value: Math.ceil(Math.random() * 6),
                        isHeld: false,
                        id: index
                    }
            }));
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }


    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map((dice, index) => {
        return <Die
            value={dice.value}
            key={index}
            isHeld={dice.isHeld}
            holdDice={() => holdDice(dice.id)}
        />
    })


    return (
        <>
            <main>
                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>

                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

                <div className="dice-container">
                    {diceElements}
                </div>

                <button
                    className="roll-dice"
                    onClick={rollDice}>
                    {tenzies ? "New Game" : "Roll the dice!"}
                </button>
            </main>
        </>
    );
}

export default App;