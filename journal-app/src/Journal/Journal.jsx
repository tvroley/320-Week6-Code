import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, orderBy, deleteDoc, setDoc } from "firebase/firestore";
import db from '../db';
import { Link } from 'react-router-dom';
import AddJournal from './AddJournal';

export default function Journal() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const journalQuery = query(collection(db, 'journal-entries'), orderBy('createdAt', 'desc'));
                onSnapshot(journalQuery, snapshot => {
                    console.log("Current data: ", snapshot.docs);
                    setEntries(snapshot.docs);
                });
                
                setIsLoading(false);
            } catch {
                setHasError(true);
                setIsLoading(false);
            }
        }

        getData();
        return () => onSnapshot;
    }, [])

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "journal-entries", id));
    }

    const handleEdit = async (id) => {
        const newData = window.prompt('New Entry')
        await setDoc(doc(db, "journal-entries", id), {
            entry: newData,
            createdAt: new Date()
        });
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (hasError) {
        return <p>Error!</p>
    }

    return (
        <div>
            <h1>Journal</h1>
            <AddJournal />
            {entries.map(entry => {
                return <div key={entry.id}>
                    <p>{entry.data().entry}</p>
                    <span>

                    <Link to={`/journal/${entry.id}`}>View</Link>
                    </span>
                    <span>
                    <button onClick={() => handleDelete(entry.id)}>DELETE</button>
                    <button onClick={() => handleEdit(entry.id)}>Edit</button>
                    </span>
                    </div>
            })}
        </div>
    );
}
