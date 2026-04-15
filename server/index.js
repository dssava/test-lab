import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

let domains = [
  {
    id: 1,
    domain: 'example.com',
    owner: 'Ivan Petrenko',
    expiresAt: '2026-12-31',
  },
  {
    id: 2,
    domain: 'college.edu.ua',
    owner: 'Olena Shevchenko',
    expiresAt: '2027-03-15',
  },
];

const validateDomain = ({ domain, owner, expiresAt }) => {
  const errors = {};

  if (typeof domain !== 'string' || domain.trim().length < 3) {
    errors.domain = 'Поле domain має бути рядком довжиною не менше 3 символів.';
  }

  if (typeof owner !== 'string' || owner.trim().length < 3) {
    errors.owner = 'Поле owner має бути рядком довжиною не менше 3 символів.';
  }

  if (typeof expiresAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(expiresAt)) {
    errors.expiresAt = 'Поле expiresAt має бути рядком у форматі YYYY-MM-DD.';
  } else {
    const date = new Date(expiresAt);
    if (Number.isNaN(date.getTime())) {
      errors.expiresAt = 'Некоректна дата закінчення.';
    }
  }

  return errors;
};

app.get('/domains', (req, res) => {
  res.json(domains);
});

app.post('/domains', (req, res) => {
  const { domain, owner, expiresAt } = req.body;
  const errors = validateDomain({ domain, owner, expiresAt });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Помилка валідації.',
      errors,
    });
  }

  const newDomain = {
    id: Date.now(),
    domain: domain.trim(),
    owner: owner.trim(),
    expiresAt,
  };

  domains.push(newDomain);
  res.status(201).json(newDomain);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
