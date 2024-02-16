import React, {useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import db from '../db';

function AddJournal() {
    const [entry, setEntry] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(entry);
        //const textAreaEl = event.target.firstElementChild.nextElementSibling;
        //setEntry(textAreaEl.value);

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "journal-entries"), {
            entry: entry,
            createdAt: new Date()
        });
        setEntry('');
        console.log("Document written with ID: ", docRef.id);
    }

    return (
        <>
            <h2>Add Journal Entry</h2>
            <form action="" onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="entry-input"></label>
                <textarea id='entry-input'></textarea>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddJournal;