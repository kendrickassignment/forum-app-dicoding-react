import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <div className="create-thread-page">
      <h2>Buat Thread Baru</h2>
      <form className="create-thread-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Judul
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul thread"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="category">
            Kategori
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategori (opsional)"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="body">
            Isi Thread
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tulis isi thread Anda..."
              rows={8}
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn--primary">Buat Thread</button>
      </form>
    </div>
  );
}

export default CreateThreadPage;
