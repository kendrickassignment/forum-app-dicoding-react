import { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ onAddComment }) {
  const [content, setContent] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    }
  };

  return (
    <form className="comment-input" onSubmit={onSubmit}>
      <h4 className="comment-input__title">Beri Komentar</h4>
      <textarea
        className="comment-input__field"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar Anda..."
        rows={4}
        required
      />
      <button type="submit" className="comment-input__button">
        Kirim
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
