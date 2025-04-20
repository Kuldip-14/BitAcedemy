import React, { useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

const RichTextEditor = ({ input, setInput }) => {
    const editor = useRef(null);

    const handleChange = (content) => {
        setInput({ ...input, description: content });
    };

    return (
        <JoditEditor
            ref={editor}
            value={input.description}
            onChange={handleChange}
            
        />
    );
};

export default RichTextEditor;
