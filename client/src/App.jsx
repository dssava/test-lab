import React, { useEffect, useState } from 'react';

function App() {
  const [domains, setDomains] = useState([]);
  const [form, setForm] = useState({
    domain: '',
    owner: '',
    expiresAt: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5001/domains');
      const data = await res.json();
      setDomains(data);
    } catch (error) {
      setMessage('Не вдалося завантажити дані.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    try {
      const res = await fetch('http://localhost:5001/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        setMessage(data.message || 'Помилка.');
        return;
      }

      setForm({
        domain: '',
        owner: '',
        expiresAt: '',
      });

      setMessage('Домен успішно додано.');
      fetchData();
    } catch (error) {
      setMessage('Помилка зʼєднання з сервером.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>База доменів</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          name="domain"
          placeholder="Введіть домен"
          value={form.domain}
          onChange={handleChange}
        />
        {errors.domain && <p style={{ color: 'red', margin: 0 }}>{errors.domain}</p>}

        <input
          type="text"
          name="owner"
          placeholder="Введіть власника"
          value={form.owner}
          onChange={handleChange}
        />
        {errors.owner && <p style={{ color: 'red', margin: 0 }}>{errors.owner}</p>}

        <input type="date" name="expiresAt" value={form.expiresAt} onChange={handleChange} />
        {errors.expiresAt && <p style={{ color: 'red', margin: 0 }}>{errors.expiresAt}</p>}

        <button type="submit">Додати домен</button>
      </form>

      {message && <p>{message}</p>}

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Domain</th>
            <th>Owner</th>
            <th>Expires At</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.domain}</td>
              <td>{item.owner}</td>
              <td>{item.expiresAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
