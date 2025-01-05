const PopUpError = ({ data, onClose }) => {
    return (
        <div className="popup-error">
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            <button onClick={onClose}>Tutup</button>
        </div>
    );
};

export default PopUpError;
