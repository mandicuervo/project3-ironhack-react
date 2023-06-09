import './Tags.css'
import { useState } from "react";

export default function Tags({handleTags}) {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
        handleTags(tags);
    }

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
      
        if (key === ',' || key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          setTags([...tags, trimmedInput]);
          setInput('');
        }
      
        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
          e.preventDefault();
          setTags(tagsCopy);
          setInput(poppedTag);
        }
      
        setIsKeyReleased(false);
      };
      
      const onKeyUp = () => {
        setIsKeyReleased(true);
      }

      const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
      }

    return(
        <div className="Tags">
          <input
              value={input}
              placeholder="Enter a tag"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onChange={onChange}
          />
          {tags.map((tag, index) => (
          <div className="tag" key={tag}>
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
          </div>
        ))}
        </div>
    )
}