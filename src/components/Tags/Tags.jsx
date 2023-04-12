import { useState } from "react";

export default function Tags() {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [iskeyReleased, setIsKeyRelesed] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    }

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if(key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if(key === "Backspace" && !input.length && tags.length) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            
            setTags(tagsCopy);
            setInput(poppedTag);
        }
    };


    return(
        <div className="Tags">
            {tags.map((tag) => <div className="tag" key={tag}>{tag}</div>)}
            <input
                value={input}
                placeholder="Enter a tag"
                onKeyDown={onKeyDown}
                onChange={onChange}
            />
        </div>
    )
}