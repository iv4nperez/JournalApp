import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeliting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    }, [ note, reset ])

    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues }) )
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeliting( id ) )
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content" >
                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happend today"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                >
                </textarea>

                {
                    ( note.url ) &&
                    <div className="notes__image">
                        <img
                            src={ note.url }
                            alt="un arbol"
                        />
                    </div>
                }
            </div>
            <button 
                className="btn btn-danger h-70 btrr-15 btlr-15"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
