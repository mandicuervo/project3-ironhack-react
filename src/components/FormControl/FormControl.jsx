export default function FormControl({ children, text, htmlFor, error }) {
    return (
        <div className="FormControl mb3">
            <label htmlFor={htmlFor} className="form-label">{ text }</label>
            { children }
            <div className="invalid-feefback">
                { error }
            </div>
        </div>
    );
}