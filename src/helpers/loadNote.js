import { db } from "../firebase/firebase-config"



export const loadNotes = async ( uid ) => {
   const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

   const notes = [];
   notesSnap.forEach( snapShot => {
        notes.push({
            id: snapShot.id,
            ...snapShot.data()
        })
   })
   return notes;
}