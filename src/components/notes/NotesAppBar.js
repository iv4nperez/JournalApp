import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );
    
    const noteDate = moment( active.date );

    const handleSave = () => {
       dispatch( startSaveNote( active )  )
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('MMMM Do YYYY') }</span>

            <input 
                id="fileSelector"
                type="file"
                style={{ display:'none' }}
                onChange={ handleFileChange }
            />
            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    picture
                </button>

                <button 
                    onClick={ handleSave }
                    className="btn"
                >
                    save
                </button>
            </div>
        </div>
    )
}
